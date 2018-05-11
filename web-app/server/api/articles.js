const router = require('express').Router();
module.exports = router;

const request = require('request');
const MERCURY_API_KEY = process.env.MERCURY_API_KEY;
const { Article, Author } = require('../db/models');

// GET /api/articles
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  const status = req.query.status;

  Article.findAll({
    where: { userId, status },
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
  const { articleUrl } = req.body;
  const userId = req.user.id;

  const mercuryRequestOptions = {
    url: `https://mercury.postlight.com/parser?url=${articleUrl}`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': MERCURY_API_KEY
    }
  };

  // Make Mercury API request on URL received from Chrome extension
  request(mercuryRequestOptions, (apiErr, apiRes, apiBody) => {
    if (apiErr) console.log(apiErr);
    const data = JSON.parse(apiBody);
    console.log(data);
    Article.create({
      title: data.title,
      sourceUrl: data.url,
      content: data.content,
      wordCount: data.wordCount,
      publicationDate: data.publicationDate,
      userId
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
