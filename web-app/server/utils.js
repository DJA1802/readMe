function buildMercuryJSONRequest (articleUrl) {
  return {
    url: `https://mercury.postlight.com/parser?url=${articleUrl}`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.MERCURY_API_KEY
    }
  };
}

function getPublicationName (htmlString) {
  const metaTagOgSiteName = '<meta property="og:site_name" content="';
  const metaTagAppName = '<meta name="application-name" content="';
  const metaStarturl = '<meta name="msapplication-starturl" content="';

  const nameTests = [metaTagOgSiteName, metaTagAppName, metaStarturl];

  for (let i = 0; i < nameTests.length; i++) {
    if (htmlString.search(nameTests[i]) !== -1) {
      return extractMetaContentFromHtml(htmlString, nameTests[i]);
    }
  }
}

function extractMetaContentFromHtml (htmlString, metaPattern) {
  let beginning = htmlString.search(metaPattern) + metaPattern.length;
  let end = htmlString.indexOf('"', beginning);
  return htmlString.slice(beginning, end);
}

function getDomainFromURLString (urlString) {
  /* got the regex from
  https://stackoverflow.com/questions/25703360/regular-expression-extract-subdomain-domain
  */
  var myRegexp = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/gim;
  return myRegexp.exec(urlString)[1];
}

function setPublicationName (htmlString, articleUrl) {
  let publicationName;
  if (getPublicationName(htmlString)) {
    publicationName = getPublicationName(htmlString);
  } else {
    publicationName = getDomainFromURLString(articleUrl);
  }
  return publicationName.split(' - ')[0]; // in case of descriptions in same string, i.e 'Yahoo News - Latest News & Headlines'
}

module.exports = { setPublicationName, buildMercuryJSONRequest };