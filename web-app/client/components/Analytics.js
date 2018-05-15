import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { AnalyticsVisual } from '../components';
import { fetchInteractions } from '../store';
import _ from 'lodash';

class Analytics extends Component {
  componentDidMount () {
    this.props.loadData();
  }

  render () {
    return (
      <div id="analytics-container">
        <Header as="h1">Analytics</Header>
        <AnalyticsVisual interactions={this.props.interactions} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    interactions: state.interactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(fetchInteractions())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
