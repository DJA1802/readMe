const Sequelize = require('sequelize');
const db = require('../db');
const sanitizeHTML = require('sanitize-html');

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
  // sanitizeHTML before creating article
  articleInstance.content = sanitizeHTML(articleInstance.content);
  // attempt to find a thumbnail image for this article
});

module.exports = Article;
