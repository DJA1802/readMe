// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import MediaQuery from 'react-responsive';
import { Container } from 'semantic-ui-react';
import { NavbarSideDesktop } from '.';
import { desktop } from '../utils/constants';

const PageContainer = ({ children }) => {
  return (
    <Container id="page-container">
      <MediaQuery minWidth={desktop}>
        <NavbarSideDesktop />
      </MediaQuery>
      <Container id="page-content">{children}</Container>
    </Container>
  );
};

export default PageContainer;
