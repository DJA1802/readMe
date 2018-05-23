const router = require('express').Router();
const { Interaction, Article, Publication } = require('../db/models');
const { msToTime, isLoggedIn } = require('../utils');

router.get('/homePageStats', isLoggedIn, async (req, res, next) => {
  const totalWordCount = await Article.getTotalWordCount(req.user.id, [
    'my-list'
  ]);
  // For estimatedReadTime: 200 words per minute * 60 to convert to seconds * 1000 for milliseconds
  const readingThisWeek = await Interaction.readingTimeThisX(
    req.user.id,
    'week'
  );
  const distinctPublications = await Publication.getDistinctForUser(
    req.user.id,
    ['my-list']
  );
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

module.exports = router;
