const router = require('express').Router();
const { Article, Interaction, Publication, Tag } = require('../db/models');
module.exports = router;

const interactionQueryAttributes = ['id', 'duration', 'startTime', 'endTime'];
const articleQueryAttributes = ['id', 'title', 'wordCount'];
const publicationQueryAttributes = ['id', 'name'];

router.get('/', (req, res, next) => {
  const { id } = req.user;
  Interaction.findAll({
    include: {
      model: Article,
      where: { userId: id },
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

router.post('/', (req, res, next) => {
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

router.get('/first', (req, res, next) => {
  const { id } = req.user;
  Interaction.getUserFirstEverInteraction(id)
    .then(firstEverInteraction => res.json(firstEverInteraction))
    .catch(next);
});

router.get('/hours', (req, res, next) => {
  const { id } = req.user;
  Interaction.readingStartTimesByHour(id)
    .then(startTimesByHour => res.json(startTimesByHour))
    .catch(next);
});

router.get('/pubs', (req, res, next) => {
  const { id } = req.user;
  Interaction.publicationGroupByArticleCount(id)
    .then(publications => res.json(publications))
    .catch(next);
});
