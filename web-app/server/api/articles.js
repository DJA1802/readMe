const router = require('express').Router();
module.exports = router;

const request = require('request-promise-native');
const MERCURY_API_KEY = process.env.MERCURY_API_KEY;
const { Article, Author } = require('../db/models');
const { getPublicationName } = require('../utils');

// GET /api/articles
router.get('/', (req, res, next) => {
  const userId = req.user ? req.user.id : null;
  if (userId) {
    Article.findAll({
      where: { userId },
      include: [
        {
          model: Author
        }
      ]
    })
      .then(articles => res.json(articles))
      .catch(next);
  }
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

  request({ url: articleUrl }, (htmlErr, htmlRes, htmlStr) => {
    if (htmlErr) console.log(htmlErr);
    const publication = getPublicationName(htmlStr);
    console.log(publication);
    console.log(htmlRes);
    return publication;
  }).then(publication => {
    // Make Mercury API request on URL received from Chrome extension
    request(mercuryRequestOptions, (apiErr, apiRes, apiBody) => {
      if (apiErr) console.log(apiErr);
      const data = JSON.parse(apiBody);
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

router.put('/:id', (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  Article.update(
    { status },
    {
      where: { id },
      returning: true,
      plain: true
    }
  )
    .then(article => res.json(article))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Article.findById(req.params.id)
    .then(article => article.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});
