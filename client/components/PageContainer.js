import React from 'react';
import MediaQuery from 'react-responsive';
import { Container } from 'semantic-ui-react';
import { NavbarSideDesktop, NavbarSideMobile, Message, NavbarTop } from '.';
import { desktop } from '../utils/constants';

const PageContainer = props => {
  const { children } = props;
  return (
    <React.Fragment>
      <NavbarTop />
      <Message />
      <div id="page-container">
        <MediaQuery minWidth={desktop}>
          {matches => {
            if (matches) {
              return <NavbarSideDesktop />;
            } else {
              return <NavbarSideMobile />;
            }
          }}
        </MediaQuery>
        <Container id="page-content">{children}</Container>
      </div>
    </React.Fragment>
  );
};

export default PageContainer;
