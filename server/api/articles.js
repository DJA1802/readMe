const router = require('express').Router();
// TODO: include real Article model and make DB call;
// const {Article} = require('../db/models');
module.exports = router;
const EXAMPLE_ARTICLE = require('../../utils');

router.get('/', (req, res) => {
  const article = EXAMPLE_ARTICLE;
  res.json(article);
});
