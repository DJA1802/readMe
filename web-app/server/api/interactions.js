const router = require('express').Router();
const { Article, Interaction } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  const { id } = req.user;
  Interaction.findAll({ include: { model: Article } })
    .then(interactions => res.json(interactions))
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
