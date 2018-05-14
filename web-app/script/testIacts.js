const db = require('../server/db');
const { Interaction } = require('../server/db/models');

Interaction.getAverageForUser(1).then(userAvgTime =>
  console.log('Average in minutes: ', userAvgTime)
);
Interaction.getAverageForUser(1, 'seconds').then(userAvgTime =>
  console.log('Average in seconds: ', userAvgTime)
);
Interaction.getAverageForUser(1, 'hours').then(userAvgTime =>
  console.log('Average in hours: ', userAvgTime)
);
