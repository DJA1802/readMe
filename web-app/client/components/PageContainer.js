import React from 'react';
import MediaQuery from 'react-responsive';
import { Container } from 'semantic-ui-react';
import { NavbarSideDesktop } from '.';
import { desktop } from '../utils/constants';

const PageContainer = props => {
  const { children } = props;
  return (
    <div id="page-container">
      <MediaQuery minWidth={desktop}>
        <NavbarSideDesktop />
      </MediaQuery>
      <Container id="page-content">{children}</Container>
    </div>
  );
};

export default PageContainer;
