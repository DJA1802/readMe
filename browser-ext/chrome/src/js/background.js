import '../img/icon-128.png';
import '../img/icon-34.png';
import axios from 'axios';

const getArticleUrl = () => chrome.tabs.getSelected(null, tab => tab.url);

const fulfillSave = (articleUrl) => {
  console.log('Saving article');
  // axios
  //   .post('http://localhost:8080/api/articles', { articleUrl })
  //   .then(() => console.log('request posted'));

  chrome.extension.onMessage.addListener(
    (request, sender, sendResponse) => {
      // Create a simple text notification:
      if (chrome.notifications.getPermissionLevel() == 'denied') {
        console.log('Browser notification permission denied');
      } else {
        chrome.notifications.create({
          options: {
            type: 'basic',
            message: request.msg,
            eventTime: 1
          }
        });
      }
    }
  );
};

chrome.browserAction.onClicked.addListener(tab => {
  // detect session from web app
  axios
    .get('http://localhost:8080/auth/me', {
      withCredentials: 'include'
    })
    .then(data => {
      const articleUrl = getArticleUrl();
      if (data.data) {
        console.log('User data ==>', data.data);
        console.log('User is logged in.');
        // logged in
        // (A) make request to add article to this user's articles (need to do this by userId?)
        fullfillSave(articleUrl);
        // Content Script to display "Saved Article"

      } else {
        console.log('User is not logged in.');
        // not logged in
        // (B) redirect to login page
        // chrome.windows.create({
        //   url: 'http:/localhost:8080/auth/login',
        //   type: 'popup',
        //   focused: true
        // });
        chrome.tabs.create({ url: 'http://localhost:8080/auth/login' });
        // after successful login, go back to original url and fulfill (A)
        // fulfillSave(articleUrl);
      }
    })
    .catch(err => console.log(err));
});
