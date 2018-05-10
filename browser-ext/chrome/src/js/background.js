import '../img/icon-128.png';
import '../img/icon-34.png';
import axios from 'axios';

chrome.browserAction.onClicked.addListener(tab => {
  // detect session from web app
  axios
    .get('http://localhost:8080/auth/me', {
      withcredentials: 'include'
    })
    .then(data => {
      if (data.data) {
        // logged in
        // make request to add article to this user's articles
      } else {
        // not logged in
        // redirect to login page
      }
      console.log('data ==>', data.data);
    })
    .catch(err => console.log(err));
});
