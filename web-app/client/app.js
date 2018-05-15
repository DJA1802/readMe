import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { Message, NavbarTop, NavbarSideMobile } from './components';
import { desktop } from './utils/constants';
import Routes from './routes';

const App = () => {
  return (
    <React.Fragment>
      <NavbarTop />
      <Message />
      <MediaQuery minWidth={desktop}>
        {matches => {
          if (matches) {
            return <Routes />;
          } else {
            return (
              <React.Fragment>
                <NavbarSideMobile />
                <Routes />
              </React.Fragment>
            );
          }
        }}
      </MediaQuery>
    </React.Fragment>
  );
};

export default App;
