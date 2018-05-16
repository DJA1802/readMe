import '../img/icon-128.png';
import '../img/icon-selected-128.png';
import '../img/icon-64.png';
import '../img/icon-selected-64.png';
import '../img/icon-32.png';
import './message.js';
import axios from 'axios';

const constructSaveFunction = () => {
  let saveArticle = (articleUrl, tab) => {
    console.log('Saving article');
    // update the icon
    chrome.browserAction.setIcon({
      path: 'icon-selected-64.png'
    });
    axios
      .post('http://localhost:8080/api/articles', { articleUrl })
      .then(() => {
        // Inject a confirmation message into the page
        showMessage('Article saved!');
      })
      .catch(err => {
        showMessage('This page could not be saved');
        resetIcon();
        console.log(err);
      });
  };

  return saveArticle;
};

// this function will be overwritten after a successful save in order to disable the button without graying out the extension's icon
let saveButtonFunction = constructSaveFunction();

// change icon back to default when the current page is navigated away or closed, and reset the save functionality
const resetIcon = () => {
  saveButtonFunction = constructSaveFunction();
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
        saveButtonFunction(articleUrl, tab);
        saveButtonFunction = null;
      } else {
        // not logged in - redirect to login page
        chrome.tabs.create({ url: 'http://localhost:8080/auth/login' }); // new tab
      }
    })
    .catch(err => console.log(err));
});

function showMessage (msgString) {
  // for some reason this needs to be a string
  const messageCode = `
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.style.position = 'fixed';
    div.style.height = '60px';
    div.style.width = '100%';
    div.style.textAlign = 'center';
    div.style.backgroundColor = 'white';
    div.style.top = '0px';
    div.style.zIndex = '100';
    div.style.padding = '20px';
    div.style.fontSize = '2em';
    div.style.fontFamily = 'Lato';
    div.style.opacity = '0';
    div.style.border = '1px solid black';
    div.style.transition = 'opacity 0.5s';
    div.innerHTML = '${msgString}';
    setTimeout(function () {
      div.style.opacity = 1;
      setTimeout(function () {
        div.style.opacity = 0;
        setTimeout(function () {
          div.parentElement.removeChild(div);
        }, 1000);
      }, 2000);
    }, 0);
  `;

  chrome.tabs.executeScript({
    code: messageCode
  });
}
