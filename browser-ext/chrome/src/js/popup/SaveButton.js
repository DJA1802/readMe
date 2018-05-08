import React from "react";
import { hot } from "react-hot-loader";
import { Button } from "semantic-ui-react";

const clickHander = () => {
  console.log("you clicked the button!");

  // chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
  //   var url = tabs[0].url;
  //   console.log(url);
  // });

  chrome.tabs.getSelected(null, function(tab) {
    var tablink = tab.url;
    console.log(tablink);
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
