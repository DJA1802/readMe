const Sequelize = require('sequelize');
const db = require('../db');

const Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sourceUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  wordCount: {
    type: Sequelize.INTEGER
  }
});

module.exports = Article;
