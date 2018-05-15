function msToSeconds (milliseconds) {
  return milliseconds / 1000;
}

function msToMinutes (milliseconds) {
  return msToSeconds(milliseconds) / 60;
}

function msToHours (milliseconds) {
  return msToMinutes(milliseconds) / 60;
}

function average (arr) {
  return sum(arr) / arr.length;
}

function sum (arr) {
  return arr.reduce((agg, cur) => agg + cur);
}

function convertMilliseconds (milliseconds, units) {
  switch (units) {
    case 'seconds':
      return msToSeconds(milliseconds);
    case 'minutes':
      return msToMinutes(milliseconds);
    case 'hours':
      return msToHours(milliseconds);
    case 'milliseconds':
      return milliseconds;
    default:
      return milliseconds;
  }
}

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
    if (htmlString.indexOf(nameTests[i]) !== -1) {
      return extractMetaContentFromHtml(htmlString, nameTests[i]);
    }
  }
}

function extractMetaContentFromHtml (htmlString, metaPattern) {
  let beginning = htmlString.indexOf(metaPattern) + metaPattern.length;
  let end = htmlString.indexOf('"', beginning);
  return htmlString.slice(beginning, end);
}

function extractSrcAttribute (imgElement) {
  if (imgElement) {
    const imageAttrs = imgElement.rawAttrs;
    const imageRegExp = /src\s*=\s*"(.+?)"/;
    return imageRegExp.exec(imageAttrs)[1];
  } else {
    return null;
  }
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

function sqlInList (arr) {
  const wrappedInSingleQuotes = arr.map(elem => `'${elem}'`);
  return ` (${wrappedInSingleQuotes.join(', ')})`;
}

/* https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript/32180863 */
function msToTime (duration) {
  var milliseconds = parseInt((duration % 1000) / 100, 10),
    seconds = parseInt((duration / 1000) % 60, 10),
    minutes = parseInt((duration / (1000 * 60)) % 60, 10),
    hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

  // hours = hours < 10 ? '0' + hours : hours;
  // minutes = minutes < 10 ? '0' + minutes : minutes;
  // seconds = seconds < 10 ? '0' + seconds : seconds;
  // return hours + ":" + minutes + ":" + seconds + "." + milliseconds;

  if (hours) {
    return hours + ' hr, ' + minutes + ' min';
  } else {
    return minutes + ' min';
  }
}

module.exports = {
  setPublicationName,
  buildMercuryJSONRequest,
  extractSrcAttribute,
  convertMilliseconds,
  average,
  sqlInList,
  msToTime
};
