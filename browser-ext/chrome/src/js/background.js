import '../img/icon-128.png';
import '../img/icon-34.png';

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({ url: 'background.html' });
});
