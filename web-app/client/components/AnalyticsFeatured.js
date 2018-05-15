// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const AnalyticsFeatured = () => {
  return (
    <Container className="analytics-featured">
      <Header as="h2" className="nimbus-mono-bold">
        Future home of interesting analytics
      </Header>
    </Container>
  );
};

export default AnalyticsFeatured;
