const Sequelize = require('sequelize');
const db = require('../db');
const sanitizeHTML = require('sanitize-html');
const sanitizeOptions = {
  // include images in required tags
  allowedTags: sanitizeHTML.defaults.allowedTags
    .concat(['img', 'figcaption', 'figure', 'time'])
    .filter(tag => tag !== 'div' && tag !== 'iframe' && tag !== 'html'),
  allowedAttributes: {
    img: ['*']
  },
  nonTextTags: ['style', 'script', 'textarea', 'noscript', 'aside']
};

const Article = db.define('article', {
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
    type: Sequelize.TEXT,
    defaultValue: 'http://fillmurray.com/300/200'
  }
});

Article.beforeCreate(articleInstance => {
  // sanitize html before creating article
  articleInstance.content = sanitizeHTML(
    articleInstance.content,
    sanitizeOptions
  );
  // set some tags on this article
});

Article.getMostReadByTime = function () {
  return db
    .query(
      'SELECT articles.id, articles.title, articles."sourceUrl", articles."publicationDate", articles."wordCount", articles.status, articles."publicationId", SUM(EXTRACT(EPOCH FROM interactions."endTime"-interactions."startTime"))*1000 AS "duration" FROM articles INNER JOIN interactions on articles.id = interactions."articleId" GROUP BY articles.id, articles.title, articles."sourceUrl", articles."publicationDate", articles."wordCount", articles.status, articles."publicationId" ORDER BY "duration";'
    )
    .then(data => {
      return data[0].length ? data[0][0] : null;
    });
};

module.exports = Article;
