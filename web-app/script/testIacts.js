const db = require('../server/db');
const { Interaction, Article } = require('../server/db/models');

// Interaction.getAverageLength(1).then(userAvgTime =>
//   console.log('Average in milliseconds: ', userAvgTime)
// );
// Interaction.getAverageLength(1, 'seconds').then(userAvgTime =>
//   console.log('Average in seconds: ', userAvgTime)
// );
// Interaction.getAverageLength(1, 'minutes').then(userAvgTime =>
//   console.log('Average in minutes: ', userAvgTime)
// );
// Interaction.getAverageLength(1, 'hours').then(userAvgTime =>
//   console.log('Average in hours: ', userAvgTime)
// );
Article.groupByTimeRead(1).then(data => console.log('groupbyTimeRead ', data));
Article.getMostReadByDuration(1).then(data =>
  console.log('getMostReadByDuration ', data)
);
Article.groupByInteractionCount(1).then(data =>
  console.log('groupByInteractionCount ', data)
);
Interaction.readingTimeByDate(1).then(data =>
  console.log('readingTimeByDate ', data)
);
Interaction.readingTimeByMonthYear(1).then(data =>
  console.log('readingTimeByMonth ', data)
);
Interaction.readingStartTimesByHour(1).then(data =>
  console.log('readingTimeByMonth ', data)
);
Article.getAverageWordCount(1).then(data =>
  console.log('getAverageWordCount ', data)
);
