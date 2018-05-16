const db = require('../server/db');
const { Interaction, Article, Topic } = require('../server/db/models');
const { msToTime } = require('../server/utils');

// Article.groupByTimeRead(1).then(data => console.log('groupbyTimeRead ', data));
// Article.groupByInteractionCount(1).then(data =>
//   console.log('groupByInteractionCount ', data)
// );
// Interaction.readingTimeByDate(1).then(data =>
//   console.log('Interaction.readingTimeByDate ', data)
// );
// Interaction.readingTimeByMonthYear(1).then(data =>
//   console.log('Interaction.readingTimeByMonth ', data)
// );
// Interaction.readingStartTimesByHour(1).then(data =>
//   console.log('Interaction.readingStartTimesByHour ', data)
// );
// Interaction.getAverageLength(1).then(data =>
//   console.log('Interaction.getAverageLength ', data)
// );
// Interaction.getUserFirstEverInteraction(1).then(data =>
//   console.log('getUserFirstEverInteraction ', data)
// );
// Article.getMostReadByDuration(1).then(data =>
//   console.log('getMostReadByDuration ', data)
// );
// Article.getAverageWordCount(1).then(data =>
//   console.log('getAverageWordCount ', data)
// );
// Article.getTotalWordCount(1).then(data =>
//   console.log('getTotalWordCount ', data)
// );
// Article.getTotalWordCount(1, ['my-list']).then(data =>
//   console.log('getTotalWordCount my-list only ', data)
// );
// Interaction.readingTimeThisX(1, 'doy').then(data => {
//   console.log('readingTimeToday ', data);
// });
// Interaction.readingTimeThisX(1, 'week').then(data => {
//   console.log('readingTimeThisWeek ', data);
// });
// Interaction.readingTimeThisX(1, 'month').then(data => {
//   console.log('readingTimeThisMonth ', data);
// });
// Interaction.readingTimeThisX(1, 'year').then(data => {
//   console.log('readingTimeThisYear ', data);
// });

function reflect (promise) {
  return promise.then(
    function (v) {
      return { v: v, status: 'resolved' };
    },
    function (e) {
      return { e: e, status: 'rejected' };
    }
  );
}

reflect(Topic.create({ name: 'poopie' })).then(function (v) {
  console.log(v.v + ' ' + v.status);
});
