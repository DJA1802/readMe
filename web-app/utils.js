const db = require('./server/db');
const { Article } = require('./server/db/models');
const sanitizeHTML = require('sanitize-html');

// Topic modeling (LDA)
const lda = require('lda');

const getTags = (article, numTags = 2) => {
  // @n - number of desired topics (reasonable default is 2)
  // @article - the entire article object
  // => return value - an array of tags for given article

  // clean up and remove HTML from article content
  var regex = /(<([^>]+)>)/gi;
  const cleanedContent = sanitizeHTML(article.dataValues.content).replace(
    regex
  );

  // extract sentences from cleaned article content
  const documents = cleanedContent.match(/[^\.!\?]+[\.!\?]+/g);

  // run LDA to get terms for n topics (5 terms each)
  const result = lda(documents, numTags, 5);

  const tags = [];
  for (topic of result) {
    topic.forEach(termObj => tags.push(termObj.term));
  }

  const badTags = ['undefined'];

  return tags.filter(tag => !badTags.includes(tag));
};

// Test
// Article.findOne({
//   where: { id: 31 }
//   // get 2 topics of 5 terms each for this article
// }).then(article => console.log(getTags(article)));
