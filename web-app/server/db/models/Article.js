const Sequelize = require('sequelize');
const db = require('../db');
const sanitizeHTML = require('sanitize-html');
const sanitizeOptions = {
  // include images in required tags
  allowedTags: sanitizeHTML.defaults.allowedTags.concat(['img'])
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
  }
});

Article.beforeCreate(articleInstance => {
  // sanitize html before creating article
  articleInstance.content = sanitizeHTML(
    articleInstance.content,
    sanitizeOptions
  );
  // set some tags on this article
  // attempt to find a thumbnail image for this article
});

module.exports = Article;
