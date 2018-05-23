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
    return hours + ' hr ' + minutes + ' min';
  } else {
    return minutes + ' min';
  }
}

function formatDuration (timeData, strFormat) {
  if (strFormat) {
    if (timeData) {
      return msToTime(timeData.duration);
    } else {
      return '0 hr 0 min';
    }
  } else if (!strFormat) {
    if (timeData) {
      return timeData.duration;
    } else {
      return 0;
    }
  }
}

function sqlInList (arr) {
  const wrappedInSingleQuotes = arr.map(elem => `'${elem}'`);
  return ` (${wrappedInSingleQuotes.join(', ')})`;
}

module.exports = {
  sqlInList,
  msToTime,
  formatDuration
};
