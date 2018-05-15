import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button } from 'semantic-ui-react';
import { AnalyticsVisual } from '../components';
import { fetchInteractions } from '../store';
import _ from 'lodash';

class Analytics extends Component {
  constructor () {
    super();
    this.state = { activeTab: 'charts' };
  }

  componentDidMount () {
    this.props.loadData();
  }

  handleChartsTabClick = () => this.setState({ activeTab: 'charts' });
  handleGraphsTabClick = () => this.setState({ activeTab: 'graphs' });

  render () {
    return (
      <div id="analytics-container">
        <Header as="h1">Analytics</Header>
        <Button attached="left" onClick={this.handleChartsTabClick}>
          Charts
        </Button>
        <Button onClick={this.handleGraphsTabClick}>Graphs</Button>
        {this.state.activeTab === 'charts' ? (
          <AnalyticsVisual interactions={this.props.interactions} />
        ) : (
          <div />
        )}
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
