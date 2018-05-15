const db = require('../server/db');
const { Interaction, Article } = require('../server/db/models');
const { msToTime } = require('../server/utils');

// Article.groupByTimeRead(1).then(data => console.log('groupbyTimeRead ', data));
// Article.groupByInteractionCount(1).then(data =>
//   console.log('groupByInteractionCount ', data)
// );
Interaction.readingTimeByDate(1).then(data =>
  console.log('Interaction.readingTimeByDate ', data)
);
Interaction.readingTimeByMonthYear(1).then(data =>
  console.log('Interaction.readingTimeByMonth ', data)
);
Interaction.readingStartTimesByHour(1).then(data =>
  console.log('Interaction.readingStartTimesByHour ', data)
);
Interaction.getAverageLength(1).then(data =>
  console.log('Interaction.getAverageLength ', data)
);
Interaction.getUserFirstEverInteraction(1).then(data =>
  console.log('getUserFirstEverInteraction ', data)
);
Interaction.readingTimeThisWeek(1).then(data => {
  console.log('readingTimeThisWeek ', data);
});
Article.getMostReadByDuration(1).then(data =>
  console.log('getMostReadByDuration ', data)
);
Article.getAverageWordCount(1).then(data =>
  console.log('getAverageWordCount ', data)
);
Article.getTotalWordCount(1).then(data =>
  console.log('getTotalWordCount ', data)
);
Article.getTotalWordCount(1, ['my-list']).then(data =>
  console.log('getTotalWordCount my-list only ', data)
);
