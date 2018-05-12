function getPublicationName (htmlString) {
  const metaTagOgSiteName = '<meta property="og:site_name" content="';
  const metaTagAppName = '<meta name="application-name" content="';
  const metaStarturl = '<meta name="msapplication-starturl" content="';
  const ariaLabel = 'aria-label="';

  const nameTests = [
    metaTagOgSiteName,
    metaTagAppName,
    metaStarturl,
    ariaLabel
  ];

  for (let i = 0; i < nameTests.length; i++) {
    if (htmlString.search(nameTests[i]) !== -1) {
      return extractMetaContent(htmlString, nameTests[i]);
    }
  }
}

function extractMetaContent (htmlStr, metaPattern) {
  let beginning = htmlStr.search(metaPattern) + metaPattern.length;
  console.log(beginning);
  let end = htmlStr.indexOf('"', beginning);
  console.log(end);
  console.log(htmlStr.slice(beginning, end));
  return htmlStr.slice(beginning, end);
}

module.exports = { getPublicationName };
