const Sequelize = require('sequelize');
const db = require('../db');

const Publication = db.define('publication', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Publication;
