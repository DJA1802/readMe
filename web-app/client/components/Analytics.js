// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';

const Analytics = () => {
  return (
    <div className="analytics-container">
      <Header as="h1">Analytics</Header>
      <Segment />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.articlesAll
  };
};

export default connect(mapStateToProps)(Analytics);
