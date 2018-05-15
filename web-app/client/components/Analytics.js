import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import {
  VictoryAxis,
  VictoryLine,
  VictoryBrushContainer,
  VictoryZoomContainer,
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryLabel
} from 'victory';
import moment from 'moment';
import { fetchInteractions } from '../store';
import _ from 'lodash';

class Analytics extends Component {
  constructor (props) {
    super();
    this.state = {
      zoomDomain: { x: [new Date(2018, 5, 1), Date.now()] }
    };
  }

  componentDidMount () {
    this.props.loadData();
  }

  handleZoom (domain) {
    this.setState({ zoomDomain: domain });
  }

  getInteractionData () {
    const { interactions } = this.props;
    const formattedInteractions = interactions.map(interaction => ({
      date: new Date(interaction.startTime),
      duration: Math.floor(interaction.duration / 60000)
    }));
    return formattedInteractions;
  }

  render () {
    const dateOptions = { month: 'short', day: 'numeric' };
    return (
      <div id="analytics-container">
        <Header as="h1">Analytics</Header>
        <Segment id="chart-container">
          <VictoryChart
            theme={VictoryTheme.material}
            width={600}
            height={470}
            scale={{ x: 'time' }}
            containerComponent={
              <VictoryZoomContainer
                zoomDimension="x"
                zoomDomain={this.state.zoomDomain}
                onZoomDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryLabel
              text="Minutes Spent Reading"
              textAnchor="middle"
              x={330}
              y={30}
            />
            <VictoryArea
              style={{
                data: {
                  strokeWidth: 1,
                  fillOpacity: 0.6,
                  stroke: 'gold',
                  fill: 'gold'
                }
              }}
              data={this.getInteractionData()}
              x="date"
              y="duration"
            />
          </VictoryChart>
          <VictoryChart
            padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
            width={600}
            height={100}
            scale={{ x: 'time' }}
            containerComponent={
              <VictoryBrushContainer
                brushDimensions="x"
                brushDomain={this.state.zoomDomain}
                onBrushDomainChange={this.handleZoom.bind(this)}
              />
            }
          >
            <VictoryAxis
              tickFormat={x =>
                new Date(x).toLocaleDateString('en-US', dateOptions)
              }
            />
            <VictoryArea
              style={{
                data: {
                  strokeWidth: 1,
                  fillOpacity: 0.6,
                  stroke: 'gold',
                  fill: 'gold'
                }
              }}
              data={this.getInteractionData()}
              x="date"
              y="duration"
            />
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
