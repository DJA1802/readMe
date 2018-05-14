const Sequelize = require('sequelize');
const db = require('../db');
const Article = require('./Article');
const { convertMilliseconds, average } = require('../../utils');

const Interaction = db.define('interaction', {
  startTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  endTime: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  duration: {
    type: Sequelize.VIRTUAL(Sequelize.INTEGER),
    get () {
      return this.getDataValue('endTime') - this.getDataValue('startTime');
    }
  }
});

Interaction.getAllForUser = function (userId) {
  return Interaction.findAll({
    include: [
      {
        model: Article,
        where: { userId }
      }
    ]
  });
};

Interaction.getAverageLength = function (
  userId,
  timeUnit = 'milliseconds',
  digitsAfterDecimal = 2
) {
  return Interaction.getAllForUser(userId).then(interactions => {
    const durations = interactions.map(interaction => interaction.duration);
    return convertMilliseconds(average(durations), timeUnit).toFixed(
      digitsAfterDecimal
    );
  });
};

Interaction.readingTimeByDate = function (userId) {
  return db
    .query(
      `SELECT DATE_TRUNC('day', interactions."startTime") AS "day", SUM(EXTRACT(MILLISECONDS FROM interactions."endTime"-interactions."startTime")) AS "duration" FROM interactions JOIN articles on interactions."articleId" = articles.id JOIN users ON articles."userId" = users.id WHERE users.id = ${userId} GROUP BY date_trunc('day', interactions."startTime") ORDER BY "day";`
    )
    .then(data => data[0]);
};

module.exports = Interaction;
