import React from 'react';
import axios from 'axios';
// import 'semantic-ui-css/semantic.css';
import { hot } from 'react-hot-loader';
import { Button } from 'semantic-ui-react';

const clickHander = () => {
  console.log('you clicked the button!');
  chrome.tabs.getSelected(null, function (tab) {
    var articleUrl = tab.url;
    console.log(articleUrl);
    axios
      .post('http://localhost:8080/api/articles', { articleUrl })
      .then(() => console.log('request posted'));
  });
};

const SaveButton = props => {
  return (
    <div>
      <Button onClick={clickHander}>Save for later</Button>
    </div>
  );
};

export default hot(module)(SaveButton);
