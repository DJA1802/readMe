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
  allowedSchemesByTag: {
    img: ['data', 'https']
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
  if (articleInstance.thumbnailUrl) {
    articleInstance.thumbnailUrl = articleInstance.thumbnailUrl.replace(
      /^http:\/\//i,
      'https://'
    );
  }
  // set some tags on this article
});

module.exports = Article;
