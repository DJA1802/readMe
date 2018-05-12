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
  if (getPublicationName(htmlString)) {
    return getPublicationName(htmlString);
  } else {
    return getDomainFromURLString(articleUrl);
  }
}

module.exports = { setPublicationName };
