function getPublicationName (htmlString) {
  const metaTagOgSiteName = '<meta property="og:site_name" content="';
  const metaTagAppName = '<meta name="application-name" content="';
  const metaStarturl = '<meta name="msapplication-starturl" content="';

  const nameTests = [metaTagOgSiteName, metaTagAppName, metaStarturl];

  for (let i = 0; i < nameTests.length; i++) {
    if (htmlString.search(nameTests[i]) !== -1) {
      return extractMetaContent(htmlString, nameTests[i]);
    }
  }
}

function getCookieDomain (cookieString) {
  let beginning = cookieString.search('omain=.') + 'omain=.'.length;
  let end =
    cookieString.indexOf(';', beginning) !== -1
      ? cookieString.indexOf(';', beginning)
      : null;
  if (end) {
    return cookieString.slice(beginning, end);
  } else {
    return cookieString.slice(beginning);
  }
}

function extractMetaContent (htmlStr, metaPattern) {
  let beginning = htmlStr.search(metaPattern) + metaPattern.length;
  let end = htmlStr.indexOf('"', beginning);
  return htmlStr.slice(beginning, end);
}

module.exports = { getPublicationName, getCookieDomain };
