const router = require('express').Router();
module.exports = router;

const EXAMPLE_ARTICLES = require('../../utils'); // dummy articles
const { Article, Author } = require('../db/models');

router.get('/', (req, res) => {
  Article.findAll({
    include: [
      {
        model: Author
      }
    ]
  }).then(articles => res.json(articles));
});

router.get('/:id', (req, res) => {
  Article.findById(req.params.id, {
    include: [
      {
        model: Author
      }
    ]
  }).then(article => res.json(article));
});
