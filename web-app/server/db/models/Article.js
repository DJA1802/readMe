const Sequelize = require('sequelize');
const db = require('../db');
const Author = require('./Author');
const Publication = require('./Publication');
const sanitizeHTML = require('sanitize-html');
const { sqlInList, formatDuration } = require('../../utils');
const sanitizeOptions = {
  // include images in required tags
  allowedTags: sanitizeHTML.defaults.allowedTags
    .concat(['img', 'figcaption', 'figure', 'time'])
    .filter(tag => tag !== 'div' && tag !== 'iframe' && tag !== 'html'),
  allowedAttributes: {
    a: ['href'],
    img: ['*']
  },
  allowedSchemesByTag: {
    img: ['data', 'https']
  },
  transformTags: {
    img: sanitizeHTML.simpleTransform('img', { crossorigin: 'anonymous' })
  },
  nonTextTags: ['style', 'script', 'textarea', 'noscript', 'aside']
};
const articleQueryAttributes = [
  'id',
  'content',
  'createdAt',
  'sourceUrl',
  'status',
  'title',
  'thumbnailUrl',
  'wordCount'
];

const Article = db.define(
  'article',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sourceUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    publicationDate: {
      type: Sequelize.DATE
    },
    wordCount: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.ENUM('my-list', 'archive'),
      allowNull: false,
      defaultValue: 'my-list'
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    thumbnailUrl: {
      type: Sequelize.TEXT
    }
  },
  {
    paranoid: true
  }
);

Article.beforeCreate(articleInstance => {
  articleInstance.content = sanitizeHTML(
    articleInstance.content,
    sanitizeOptions
  );
  if (articleInstance.thumbnailUrl) {
    articleInstance.thumbnailUrl = articleInstance.thumbnailUrl.replace(
      /^http:\/\//i,
      'https://'
    );
  }
});

Article.findAllForUser = function (userId) {
  return Article.findAll({
    attributes: articleQueryAttributes,
    where: { userId },
    include: [{ model: Author }, { model: Publication }]
  });
};

Article.findOneWithAssociations = function (articleId) {
  return Article.findOne({
    attributes: articleQueryAttributes,
    where: { id: articleId },
    include: [{ model: Author }, { model: Publication }]
  });
};

Article.groupByTimeRead = function (
  userId,
  articleTypes = ['my-list', 'archive'],
  strFormat = false,
  includeDeleted = false
) {
  return db
    .query(
      `SELECT articles.id, articles.title, articles."sourceUrl", articles."publicationDate", articles."wordCount", articles.status, articles."publicationId", articles."deletedAt", SUM(EXTRACT(EPOCH FROM interactions."endTime"-interactions."startTime")*1000) AS "duration" FROM articles INNER JOIN interactions on articles.id = interactions."articleId" INNER JOIN users ON articles."userId" = users.id WHERE users.id = ${userId} AND articles.status IN ${sqlInList(
        articleTypes
      )} ${
        includeDeleted ? '' : 'AND articles."deletedAt" IS NULL'
      } GROUP BY articles.id, articles.title, articles."sourceUrl", articles."publicationDate", articles."wordCount", articles.status, articles."publicationId" ORDER BY "duration" DESC;`
    )
    .then(data => {
      return data[0]
        ? data[0].map(datum =>
            Object.assign({}, datum, {
              duration: formatDuration(datum, strFormat)
            })
          )
        : null;
    });
};

Article.getMostReadByDuration = function (
  userId,
  articleTypes = ['my-list', 'archive'],
  strFormat = false,
  includeDeleted = false
) {
  return Article.groupByTimeRead(
    userId,
    articleTypes,
    strFormat,
    includeDeleted
  ).then(data => {
    return data.length ? data[0] : null;
  });
};

Article.groupByInteractionCount = function (
  userId,
  articleTypes = ['my-list', 'archive'],
  includeDeleted = true
) {
  return db
    .query(
      `SELECT articles.id, articles.title, articles."sourceUrl", articles."publicationDate", articles."wordCount", articles.status,  articles."deletedAt", COUNT(interactions."startTime")::integer AS "interactionCount" FROM articles INNER JOIN interactions on articles.id = interactions."articleId" INNER JOIN users ON articles."userId" = users.id WHERE users.id = ${userId} AND articles.status IN ${sqlInList(
        articleTypes
      )} ${
        includeDeleted ? '' : 'AND articles."deletedAt" IS NULL'
      } GROUP BY articles.id ORDER BY "interactionCount" DESC;`
    )
    .then(data => data[0]);
};

Article.getTotalWordCount = function (
  userId,
  articleTypes = ['my-list', 'archive'],
  includeDeleted = false
) {
  return db
    .query(
      `SELECT SUM("wordCount") FROM articles INNER JOIN users ON articles."userId" = users.id WHERE users.id = ${userId} AND articles.status IN ${sqlInList(
        articleTypes
      )} ${includeDeleted ? '' : 'AND articles."deletedAt" IS NULL'}`
    )
    .then(data => Number(data[0][0].sum).toFixed(0));
};

Article.getAverageWordCount = function (
  userId,
  articleTypes = ['my-list', 'archive'],
  includeDeleted = false
) {
  return db
    .query(
      `SELECT AVG("wordCount") FROM articles INNER JOIN users ON articles."userId" = users.id WHERE users.id = ${userId} AND articles.status IN ${sqlInList(
        articleTypes
      )} ${includeDeleted ? '' : 'AND articles."deletedAt" IS NULL'}`
    )
    .then(data => Number(data[0][0].avg).toFixed(0));
};

module.exports = Article;
