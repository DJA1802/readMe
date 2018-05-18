const router = require('express').Router();
const { User, Interaction, Article, Publication } = require('../db/models');
const { msToTime } = require('../utils');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/homePageStats', async (req, res, next) => {
  const { id } = req.user;
  const totalWordCount = await Article.getTotalWordCount(id, ['my-list']);
  // For estimatedReadTime: 200 words per minute * 60 to convert to seconds * 1000 for milliseconds
  const readingThisWeek = await Interaction.readingTimeThisX(id, 'week');
  const distinctPublications = await Publication.getDistinctForUser(id);
  const estimatedReadTime = msToTime(totalWordCount / 200 * 60 * 1000);
  const returnArr = [
    {
      value: readingThisWeek,
      label: 'spent reading this week'
    },
    {
      value: distinctPublications,
      label: 'publications'
    },
    {
      value: estimatedReadTime,
      label: 'est. time to finish your list'
    }
  ];
  res.json(returnArr);
});
