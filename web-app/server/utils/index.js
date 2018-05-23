const { convertMilliseconds, average } = require('./calcsAndConversions');
const { setPublicationName, extractSrcAttribute } = require('./extraction');
const { sqlInList, msToTime, formatDuration } = require('./formatting');
const { isLoggedIn } = require('./gatekeeperMiddleware');
const { buildMercuryJSONRequest } = require('./optionsObjects');

module.exports = {
  convertMilliseconds,
  average,
  setPublicationName,
  extractSrcAttribute,
  sqlInList,
  msToTime,
  formatDuration,
  isLoggedIn,
  buildMercuryJSONRequest
};
