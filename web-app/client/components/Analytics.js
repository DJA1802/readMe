import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import { VictoryPie } from 'victory';
import { fetchInteractions } from '../store';

class Analytics extends Component {
  componentWillMount () {
    this.props.loadData();
  }

  render () {
    const { interactions } = this.props;
    console.log(interactions);
    return (
      <div id="analytics-container">
        <Header as="h1">Analytics</Header>
        <Segment id="chart-container">
          <VictoryPie id="chart" />
        </Segment>
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
