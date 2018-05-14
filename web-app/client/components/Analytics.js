import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import {
  VictoryAxis,
  // VictoryLine,
  // VictoryScatter,
  // VictoryZoomContainer,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea
} from 'victory';
import moment from 'moment';
import { fetchInteractions } from '../store';

class Analytics extends Component {
  constructor (props) {
    super();
    // this.entireDomain = this.getEntireDomain(this.props);
    // this.state = {
    //   // local state for graph display state
    //   zoomedXDomain: props.entireDomain.x
    // };
  }

  componentDidMount () {
    this.props.loadData();
  }

  getInteractionData () {
    const { interactions } = this.props;
    const formattedInteractions = interactions.map(interaction => ({
      date: new Date(interaction.startTime),
      duration: interaction.duration
    }));
    return formattedInteractions;
  }

  render () {
    // const { interactions } = this.props;

    // const chartData = interactions.map(interaction => ({
    //   date: new Date(interaction.startTime),
    //   duration: interaction.duration
    // }));
    // console.log('chartData', chartData);

    return (
      <div id="analytics-container">
        <Header as="h1">Analytics</Header>
        <Segment id="chart-container">
          <VictoryChart scale={{ x: 'time' }}>
            <VictoryGroup
              style={{
                data: { strokeWidth: 1, fillOpacity: 0.5 }
              }}
            >
              <VictoryArea
                theme={VictoryTheme.material}
                style={{
                  data: { fill: 'magenta', stroke: 'magenta' }
                }}
                data={this.getInteractionData()}
                x="date"
                y="duration"
              />
            </VictoryGroup>
            <VictoryAxis tickFormat={x => moment(x).format('MMM D YYYY')} />
            <VictoryAxis
              dependentAxis
              tickFormat={y => `${Math.floor(y / 60000)}`}
            />
          </VictoryChart>

          {/*<VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis tickFormat={x => moment(x).format('MMM D YYYY')} />
            <VictoryAxis
              dependentAxis
              tickFormat={y => `${Math.floor(y / 60000)} min`}
            />
            <VictoryLine id="chart" data={chartData} x="date" y="duration" />
          </VictoryChart>*/}
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
