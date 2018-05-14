const db = require('../server/db');
const { Interaction } = require('../server/db/models');

Interaction.getAverageLength(1).then(userAvgTime =>
  console.log('Average in milliseconds: ', userAvgTime)
);
Interaction.getAverageLength(1, 'seconds').then(userAvgTime =>
  console.log('Average in seconds: ', userAvgTime)
);
Interaction.getAverageLength(1, 'minutes').then(userAvgTime =>
  console.log('Average in minutes: ', userAvgTime)
);
Interaction.getAverageLength(1, 'hours').then(userAvgTime =>
  console.log('Average in hours: ', userAvgTime)
);
