import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import { VictoryAxis, VictoryArea, VictoryChart, VictoryTheme } from 'victory';
import moment from 'moment';
import { fetchInteractions } from '../store';

class Analytics extends Component {
  componentWillMount () {
    this.props.loadData();
  }

  render () {
    const { interactions } = this.props;

    const chartData = interactions.map(interaction => ({
      date: new Date(interaction.startTime),
      duration: interaction.duration
    }));
    console.log('chartData', chartData);

    return (
      <div id="analytics-container">
        <Header as="h1">Analytics</Header>
        <Segment id="chart-container">
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis tickFormat={x => moment(x).format('MMM D YYYY')} />
            <VictoryAxis
              dependentAxis
              tickFormat={y => `${Math.floor(y / 60000)} min`}
            />
            <VictoryArea id="chart" data={chartData} x="date" y="duration" />
          </VictoryChart>
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
