const router = require('express').Router();
module.exports = router;

const request = require('request');
const EXAMPLE_ARTICLES = require('../../utils'); // dummy articles
const MERCURY_API_KEY = require('../../secrets');
const { Article, Author } = require('../db/models');

const mercuryRequestOptions = {
  url:
    'https://mercury.postlight.com/parser?url=https://www.newyorker.com/magazine/2018/04/23/the-maraschino-moguls-secret-life',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': MERCURY_API_KEY
  }
};

router.get('/', (req, res, next) => {
  Article.findAll({
    include: [
      {
        model: Author
      }
    ]
  })
    .then(articles => res.json(articles))
    .catch(next);
});

router.post('/', (req, res, next) => {
  request(mercuryRequestOptions, (apiErr, apiRes, apiBody) => {
    const data = JSON.parse(apiBody);
    res.send(data);
  });
});

router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id, {
    include: [
      {
        model: Author
      }
    ]
  })
    .then(article => res.json(article))
    .catch(next);
});
