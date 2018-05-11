import '../img/icon-128.png';
import '../img/icon-34.png';
import axios from 'axios';

const fulfillSave = (articleUrl, tab) => {
  console.log('Saving article');
  axios
    .post('http://localhost:8080/api/articles', { articleUrl })
    .then(() => {
      console.log('request posted');
      // Create "Saved Article" notification
      chrome.notifications.getPermissionLevel(level => {
        if (level === 'denied') {
          console.log('Browser notification permission denied');
        } else {
          console.log('Creating notification!');
          const notificationIcon = tab.favIconUrl
            ? tab.favIconUrl
            : 'icon-34.png';
          const notificationName = tab.title ? `${tab.title}` : tab.url;
          chrome.notifications.create(
            {
              type: 'basic',
              iconUrl: notificationIcon,
              title: 'readMe',
              message: `Saved "${notificationName}"`,
              eventTime: 5000
            },
            () => console.log('notification saved for articleUrl', articleUrl)
          );
        }
      });
    })
    .catch(err => console.log(err));
};

chrome.browserAction.onClicked.addListener(tab => {
  const articleUrl = tab.url;
  // detect session from web app
  axios
    .get('http://localhost:8080/auth/me', {
      withCredentials: 'include'
    })
    .then(data => {
      if (data.data) {
        // logged in
        console.log('User data ==>', data.data);
        console.log('User is logged in.');
        // Save article to this user's articles
        fulfillSave(articleUrl, tab);
      } else {
        // not logged in
        console.log('User is not logged in.');
        // (B) redirect to login page
        // chrome.windows.create({ // new popup window
        //   url: 'http:/localhost:8080/auth/login',
        //   type: 'popup',
        //   focused: true
        // });
        chrome.tabs.create({ url: 'http://localhost:8080/auth/login' }); // new tab
        // after successful login, go back to original url and fulfill (A)
        // fulfillSave(articleUrl);
      }
    })
    .catch(err => console.log(err));
});
