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

module.exports = Interaction;
