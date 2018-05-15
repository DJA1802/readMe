import '../img/icon-128.png';
import '../img/icon-selected-128.png';
import '../img/icon-64.png';
import '../img/icon-selected-64.png';
import '../img/icon-32.png';
import axios from 'axios';

const fulfillSave = (articleUrl, tab) => {
  console.log('Saving article');
  // update the icon
  chrome.browserAction.setIcon({
    path: 'icon-selected-64.png'
  });
  axios
    .post('http://localhost:8080/api/articles', { articleUrl })
    .then(() => {
      // Create "Saved Article" notification
      chrome.notifications.getPermissionLevel(level => {
        if (level === 'granted') {
          const notificationIcon = tab.favIconUrl
            ? tab.favIconUrl
            : 'icon-32.png';
          const notificationName = tab.title ? `${tab.title}` : tab.url;
          chrome.notifications.create(
            {
              type: 'basic',
              iconUrl: notificationIcon,
              title: 'readMe',
              message: `Saved "${notificationName}"`,
              eventTime: 5000
            },
            () => {}
          );
        }
      });
    })
    .catch(err => {
      resetIcon();
      console.log(err);
    });
};

// change icon back to default when the current page is navigated away or closed
const resetIcon = () => {
  chrome.browserAction.setIcon({
    path: 'icon-64.png'
  });
};
chrome.tabs.onUpdated.addListener(resetIcon);
chrome.tabs.onRemoved.addListener(resetIcon);

chrome.browserAction.onClicked.addListener(tab => {
  const articleUrl = tab.url;
  // detect session from web app
  axios
    .get('http://localhost:8080/auth/me', {
      withCredentials: 'include'
    })
    .then(data => {
      if (data.data) {
        // logged in - save article to this user's articles
        fulfillSave(articleUrl, tab);
      } else {
        // not logged in - redirect to login page
        chrome.tabs.create({ url: 'http://localhost:8080/auth/login' }); // new tab
        // after successful login, go back to original url and fulfill
        // fulfillSave(articleUrl);
      }
    })
    .catch(err => console.log(err));
});
