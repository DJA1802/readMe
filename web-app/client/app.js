import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import { NavbarTop, NavbarSideMobile } from './components';
import Routes from './routes';

const App = () => {
  return (
    <div>
      <NavbarTop />
      <Sidebar.Pushable id="main">
        <NavbarSideMobile />
        <Sidebar.Pusher>
          <Routes />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
};

export default App;
