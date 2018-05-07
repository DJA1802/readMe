const Sequelize = require('sequelize');
const db = require('../db');

const PublicationType = db.define('publicationType', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = PublicationType;
