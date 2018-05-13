import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { NavbarTop, NavbarSideMobile } from './components';
import { desktop } from './utils/constants';
import Routes from './routes';

const App = () => {
  return (
    <React.Fragment>
      <NavbarTop />
      <MediaQuery minWidth={desktop}>
        {matches => {
          if (matches) {
            return <Routes />;
          } else {
            return (
              <Sidebar.Pushable className="page-height">
                <NavbarSideMobile />
                <Sidebar.Pusher className="page-height">
                  <Routes />
                </Sidebar.Pusher>
              </Sidebar.Pushable>
            );
          }
        }}
      </MediaQuery>
    </React.Fragment>
  );
};

export default App;
