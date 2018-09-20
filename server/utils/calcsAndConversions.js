function average (arr) {
  return sum(arr) / arr.length;
}

function sum (arr) {
  return arr.reduce((agg, cur) => agg + cur);
}

function msToSeconds (milliseconds) {
  return milliseconds / 1000;
}

function msToMinutes (milliseconds) {
  return msToSeconds(milliseconds) / 60;
}

function msToHours (milliseconds) {
  return msToMinutes(milliseconds) / 60;
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

module.exports = {
  convertMilliseconds,
  average
};
