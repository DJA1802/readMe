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
        where: { userId },
        paranoid: false
      }
    ]
  });
};

// The below function defaults to milliseconds, but you can also supply "seconds", "minutes", or "hours".
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
      `SELECT DATE_TRUNC('day', interactions."startTime") AS "day", SUM(EXTRACT(MILLISECONDS FROM interactions."endTime"-interactions."startTime")) AS "duration" FROM interactions INNER JOIN articles on interactions."articleId" = articles.id INNER JOIN users ON articles."userId" = users.id WHERE users.id = ${userId} GROUP BY date_trunc('day', interactions."startTime") ORDER BY "day";`
    )
    .then(data => data[0]);
};

Interaction.readingTimeByMonthYear = function (userId) {
  return db
    .query(
      `SELECT TO_CHAR(interactions."startTime", 'MM') AS "month", TO_CHAR(interactions."startTime", 'YYYY') AS "year", TO_CHAR(interactions."startTime", 'TMMon') || ' ' || TO_CHAR(interactions."startTime", 'YYYY') AS "month_year", SUM(EXTRACT(MILLISECONDS FROM interactions."endTime"-interactions."startTime")) AS "duration" FROM interactions INNER JOIN articles on interactions."articleId" = articles.id INNER JOIN users ON articles."userId" = users.id WHERE users.id = ${userId} GROUP BY TO_CHAR(interactions."startTime", 'MM'), TO_CHAR(interactions."startTime", 'YYYY'), TO_CHAR(interactions."startTime", 'TMMon') || ' ' || TO_CHAR(interactions."startTime", 'YYYY') ORDER BY "year", "month";`
    )
    .then(data => data[0]);
};

Interaction.readingStartTimesByHour = function (userId) {
  // interactions are bucketed by each of the 24 hours of a day
  // hour: 0 would equal any startTime between 12:00AM and 12:59AM
  return db
    .query(
      `SELECT trunc(EXTRACT(hour from "startTime")) AS "hour", COUNT(EXTRACT(MILLISECONDS FROM interactions."endTime"-interactions."startTime"))::integer AS "interactionCount" FROM interactions INNER JOIN articles on interactions."articleId" = articles.id INNER JOIN users ON articles."userId" = users.id WHERE users.id = ${userId} GROUP BY trunc(EXTRACT(hour from "startTime")) ORDER BY "hour", "interactionCount";`
    )
    .then(data => data[0]);
};

Interaction.getUserFirstEverInteraction = function (userId) {
  return db
    .query(
      `SELECT MIN("startTime") AS "firstInteraction" FROM interactions INNER JOIN articles on interactions."articleId" = articles.id INNER JOIN users ON articles."userId" = users.id WHERE users.id = ${userId};`
    )
    .then(data => data[0][0].firstInteraction);
};

module.exports = Interaction;
