const router = require('express').Router();
const { Article, Interaction, Publication, Tag } = require('../db/models');
const { isLoggedIn } = require('../utils');
const interactionQueryAttributes = ['id', 'duration', 'startTime', 'endTime'];
const articleQueryAttributes = ['id', 'title', 'wordCount'];
const publicationQueryAttributes = ['id', 'name'];

// GET --------------------------------------------------------- //
router.get('/', isLoggedIn, (req, res, next) => {
  Interaction.findAll({
    include: {
      model: Article,
      where: { userId: req.user.id },
      attributes: articleQueryAttributes,
      paranoid: false, // include articles that have been deleted
      include: [
        { model: Publication, attributes: publicationQueryAttributes },
        { model: Tag }
      ]
    },
    attributes: interactionQueryAttributes
  })
    .then(interactions => {
      res.json(interactions);
    })
    .catch(next);
});

router.get('/first', isLoggedIn, (req, res, next) => {
  Interaction.getUserFirstEverInteraction(req.user.id)
    .then(firstEverInteraction => res.json(firstEverInteraction))
    .catch(next);
});

router.get('/hours', (req, res, next) => {
  Interaction.readingStartTimesByHour(req.user.id)
    .then(startTimesByHour => res.json(startTimesByHour))
    .catch(next);
});

router.get('/pubs', (req, res, next) => {
  Publication.groupByArticleCount(req.user.id)
    .then(publications => res.json(publications))
    .catch(next);
});

// POST ------------------------------------------------------- //
router.post('/', isLoggedIn, (req, res, next) => {
  Promise.all(
    req.body.interactions.map(interaction => {
      Interaction.create(interaction);
    })
  )
    .then(interactions => {
      res.json(interactions);
    })
    .catch(next);
});

module.exports = router;
