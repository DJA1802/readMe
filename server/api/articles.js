const router = require('express').Router();
module.exports = router;

const request = require('request');
const MERCURY_API_KEY = require('../../web-app/secrets');
const { Article, Author } = require('../db/models');

// GET /api/articles
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

// POST /api/articles
router.post('/', (req, res, next) => {
  // const articleUrl = req.body ...
  const mercuryRequestOptions = {
    url:
      'https://mercury.postlight.com/parser?url=https://www.newyorker.com/magazine/2018/04/23/the-maraschino-moguls-secret-life',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': MERCURY_API_KEY
    }
  };
  request(mercuryRequestOptions, (apiErr, apiRes, apiBody) => {
    const data = JSON.parse(apiBody);
    // Do stuff with the received info and insert into DB
    res.send(data);
  });
});

// GET /api/articles/:id
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
