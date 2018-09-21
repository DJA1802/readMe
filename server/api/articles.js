const router = require('express').Router();
const request = require('request-promise-native');
const { parse } = require('node-html-parser');
const { Article, Author, Publication } = require('../db/models');
const {
  setPublicationName,
  buildMercuryJSONRequest,
  extractSrcAttribute,
  isLoggedIn
} = require('../utils');

// GET --------------------------------------------------------- //

router.get('/', isLoggedIn, (req, res, next) => {
  Article.findAllForUser(req.user.id)
    .then(articles => res.json(articles))
    .catch(next);
});

router.get('/mostReadByDuration', isLoggedIn, (req, res, next) => {
  Article.groupByTimeRead(req.user.id, ['my-list', 'archive'], true, true)
    .then(articles =>
      res.json(
        articles.map(article => ({
          id: article.id,
          article: article.title,
          duration: article.duration,
          deleted: !!article.deletedAt
        }))
      )
    )
    .catch(next);
});

router.get('/mostReadByInteraction', isLoggedIn, (req, res, next) => {
  Article.groupByInteractionCount(req.user.id)
    .then(articles =>
      res.json(
        articles.map(article => ({
          id: article.id,
          article: article.title,
          interactionCount: article.interactionCount,
          deleted: !!article.deletedAt
        }))
      )
    )
    .catch(next);
});

// This needs to stay BELOW all the other routes because otherwise "mostReadByInteraction" or "mostReadByDuration" will be treated like a :id wildcard and will result in those strings being passed as the :id param.
router.get('/:id', isLoggedIn, (req, res, next) => {
  Article.findById(req.params.id, {
    include: [{ model: Author }, { model: Publication }]
  })
    .then(article => res.json(article))
    .catch(next);
});

// POST ------------------------------------------------------- //
router.post('/', isLoggedIn, (req, res, next) => {
  const userId = req.user.id;
  const { articleUrl } = req.body;

  createNewArticle(userId, articleUrl, next)
    .then(newArticle => returnCreatedArticle(newArticle))
    .then(associatedArticle => res.status(201).json(associatedArticle))
    .catch(next);
});

// PUT --------------------------------------------------------- //

router.put('/:id', isLoggedIn, (req, res, next) => {
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
    .then(([_, article]) => Article.findOneWithAssociations(article.id))
    .then(article => res.json(article))
    .catch(next);
});

// DELETE ----------------------------------------------------- //

router.delete('/:id', isLoggedIn, (req, res, next) => {
  Article.findById(req.params.id)
    .then(article => article.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
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
  const imageSrc = extractSrcAttribute(parsedHtml.querySelector('img'));

  if (mercuryArticle.title) {
    const newArticle = await Article.create({
      title: mercuryArticle.title,
      sourceUrl: mercuryArticle.url,
      content: mercuryArticle.content,
      wordCount: mercuryArticle.word_count,
      publicationDate: mercuryArticle.date_published,
      userId,
      publicationId: publication.id,
      thumbnailUrl: imageSrc
    }).catch(err => {
      next(err);
    });
    return newArticle;
  } else {
    return Promise.reject(new Error('No mercury article'));
  }
}

async function returnCreatedArticle (newArticle) {
  const associatedArticle = await Article.findOneWithAssociations(
    newArticle.id
  );
  return associatedArticle;
}
// ------------------------------------------------------------ //

module.exports = { router, createNewArticle };
