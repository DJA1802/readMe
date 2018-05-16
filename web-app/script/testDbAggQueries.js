const { Interaction, Article, Publication } = require('../server/db/models');

Interaction.readingTimeByDate(1).then(data =>
  console.log('Interaction.readingTimeByDate ', data)
);
Interaction.readingTimeByMonthYear(1).then(data =>
  console.log('Interaction.readingTimeByMonthYear ', data)
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
Interaction.readingTimeThisX(1, 'week').then(data => {
  console.log('readingTimeThisWeek ', data);
});
Interaction.readingTimeThisX(1, 'week', false).then(data => {
  console.log('readingTimeThisWeek numeric ', data);
});
Interaction.readingTimeThisX(1, 'month').then(data => {
  console.log('readingTimeThisMonth ', data);
});
Interaction.readingTimeThisX(1, 'year').then(data => {
  console.log('readingTimeThisYear ', data);
});
Publication.getDistinctForUser(1).then(data => {
  console.log('Publication.getDistinctForUser ', data);
});
Publication.groupByArticleCount(1).then(data => {
  console.log('Publication.groupByArticleCount ', data);
});
