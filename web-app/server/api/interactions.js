const router = require('express').Router();
const { Interaction } = require('../db/models');
module.exports = router;

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
