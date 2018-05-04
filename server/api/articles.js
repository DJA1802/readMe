const router = require('express').Router();
// TODO: include real Article model and make DB call;
// const {Article} = require('../db/models');
module.exports = router;
const EXAMPLE_ARTICLES = require('../../utils'); // dummy articles

router.get('/', (req, res) => {
  res.json(EXAMPLE_ARTICLES);
});

router.get('/:id', (req, res) => {
  const article = EXAMPLE_ARTICLES.filter(thisArticle => thisArticle.id === req.params.id);
  res.json(article);
});
