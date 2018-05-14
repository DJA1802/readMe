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
