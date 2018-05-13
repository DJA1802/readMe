const router = require('express').Router();
const request = require('request-promise-native');
const { parse } = require('node-html-parser');

const { Article, Author, Publication } = require('../db/models');
const { setPublicationName, buildMercuryJSONRequest } = require('../utils');
const articleQueryAttributes = [
  'id',
  'title',
  'sourceUrl',
  'status',
  'wordCount',
  'status',
  'createdAt',
  'thumbnailUrl'
];

// ------------------------------------------------------------ //

// GET /api/articles
router.get('/', (req, res, next) => {
  const userId = req.user ? req.user.id : null;
  if (userId) {
    Article.findAll({
      attributes: articleQueryAttributes,
      where: { userId },
      include: [{ model: Author }, { model: Publication }]
    })
      .then(articles => res.json(articles))
      .catch(next);
  }
});

// HELPER FUNCTIONS FOR POSTING ARTICLE -------------------------- //
async function createNewArticle (userId, articleUrl, next) {
  if (!next) next = console.log;
  console.log('----------------------------------------------------');
  console.log('FETCHING TEXT FOR ARTICLE: ', articleUrl);

  const htmlStr = await request({ url: articleUrl }).catch(err => {
    next(err);
  });

  const publicationName = setPublicationName(htmlStr, articleUrl);
  const [publication] = await Publication.findOrCreate({
    where: {
      name: publicationName
    }
  }).catch(err => {
    next(err);
  });

  const mercuryResponse = await request(
    buildMercuryJSONRequest(articleUrl)
  ).catch(err => {
    next(err);
  });

  const mercuryArticle = JSON.parse(mercuryResponse);
  const parsedHtml = parse(mercuryArticle.content);

  // const imageAttrs = parsedHtml.querySelector('img').rawAttrs;
  // const imageRegExp = /src\s*=\s*"(.+?)"/;
  // const imageSrc = imageRegExp.exec(imageAttrs)[1];

  const newArticle = await Article.create({
    title: mercuryArticle.title,
    sourceUrl: mercuryArticle.url,
    content: mercuryArticle.content,
    wordCount: mercuryArticle.wordCount,
    publicationDate: mercuryArticle.publicationDate,
    userId,
    publicationId: publication.id
    // thumbnailUrl: imageSrc
  }).catch(err => {
    next(err);
  });

  return newArticle;
}

async function returnCreatedArticle (newArticle) {
  const associatedArticle = await Article.findOne({
    where: { id: newArticle.id },
    attributes: articleQueryAttributes,
    include: [{ model: Author }, { model: Publication }]
  });

  return associatedArticle;
}
// ------------------------------------------------------------ //

// POST /api/articles
router.post('/', (req, res, next) => {
  const userId = req.user.id;
  const { articleUrl } = req.body;

  createNewArticle(userId, articleUrl, next)
    .then(newArticle => returnCreatedArticle(newArticle))
    .then(associatedArticle => res.status(201).json(associatedArticle))
    .catch(next);
});
// ------------------------------------------------------------ //

// GET /api/articles/:id
router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id, {
    include: [{ model: Author }, { model: Publication }]
  })
    .then(article => res.json(article))
    .catch(next);
});

// ------------------------------------------------------------ //

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

// ------------------------------------------------------------ //

router.delete('/:id', (req, res, next) => {
  Article.findById(req.params.id)
    .then(article => article.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

// ------------------------------------------------------------ //

module.exports = { router, createNewArticle };
