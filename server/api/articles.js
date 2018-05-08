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
  // articleUrl hardcoded for now, but should be req.body - i.e. the url from Chrome extension
  const articleUrl =
    'https://www.nytimes.com/2018/05/08/science/alan-turing-desalination.html?rref=collection%2Fsectioncollection%2Fscience&action=click&contentCollection=science&region=rank&module=package&version=highlights&contentPlacement=1&pgtype=sectionfront';
  const mercuryRequestOptions = {
    url: `https://mercury.postlight.com/parser?url=${articleUrl}`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': MERCURY_API_KEY
    }
  };

  // Make Mercury API request on URL received from Chrome extension
  request(mercuryRequestOptions, (apiErr, apiRes, apiBody) => {
    const data = JSON.parse(apiBody);
    Article.create({
      title: data.title,
      sourceUrl: data.url,
      content: data.content,
      wordCount: data.wordCount
    })
      .then(newArticle => res.status(201).json(newArticle))
      .catch(next);
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
