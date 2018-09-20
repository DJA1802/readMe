function buildMercuryJSONRequest (articleUrl) {
  return {
    url: `https://mercury.postlight.com/parser?url=${articleUrl}`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.MERCURY_API_KEY
    }
  };
}

module.exports = {
  buildMercuryJSONRequest
};
