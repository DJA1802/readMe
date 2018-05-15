import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryZoomContainer,
  VictoryChart,
  VictoryTheme,
  VictoryArea,
  VictoryLabel
} from 'victory';

class AnalyticsVisual extends Component {
  state = { zoomDomain: { x: [new Date(2018, 5, 1), Date.now()] } };

  getInteractionData () {
    const { interactions } = this.props;
    const formattedInteractions = interactions.map(interaction => ({
      date: new Date(interaction.startTime),
      duration: Math.floor(interaction.duration / 60000)
    }));
    return formattedInteractions;
  }

  handleZoom (domain) {
    this.setState({ zoomDomain: domain });
  }

  render () {
    const dateOptions = { month: 'short', day: 'numeric' };

    return (
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
    );
  }
}

export default AnalyticsVisual;
