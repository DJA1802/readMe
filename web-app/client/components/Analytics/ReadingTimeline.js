import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import {
  VictoryAxis,
  VictoryBrushContainer,
  VictoryZoomContainer,
  VictoryChart,
  VictoryArea,
  VictoryLabel
} from 'victory';
import { getZoom, changeZoom } from '../../store';

class ReadingTimeline extends Component {
  ComponentDidMount () {
    this.getZoom(this.props.firstInteraction);
  }

  ComponentWillUnmount () {
    this.getZoom(this.props.firstInteraction);
  }

  formatInteractionData () {
    const { interactions } = this.props;
    const formattedInteractions = interactions.map(interaction => ({
      date: new Date(interaction.startTime),
      duration: Math.floor(interaction.duration / 60000)
    }));
    return formattedInteractions;
  }

  render () {
    const zoomedDateOptions = { day: 'numeric', weekday: 'short' };
    const broadDateOptions = { month: 'short', day: 'numeric' };

    return (
      <Segment>
        <VictoryChart
          width={600}
          height={300}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.props.zoomDomain}
              onZoomDomainChange={this.props.handleZoom}
            />
          }
        >
          <VictoryAxis
            independentAxis
            tickFormat={x =>
              new Date(x).toLocaleDateString('en-US', zoomedDateOptions)
            }
            style={this.props.graphStyles.axisX}
          />
          <VictoryAxis dependentAxis style={this.props.graphStyles.axisX} />
          <VictoryLabel
            text="Minutes Spent Reading"
            textAnchor="middle"
            x={25}
            y={24}
            style={this.props.graphStyles.title}
          />
          <VictoryArea
            style={this.props.graphStyles.area}
            data={this.formatInteractionData()}
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
              height={120}
              brushDimensions="x"
              brushDomain={this.props.zoomDomain}
              onBrushDomainChange={this.props.handleZoom}
            />
          }
        >
          <VictoryAxis
            independentAxis
            tickFormat={x =>
              new Date(x).toLocaleDateString('en-US', broadDateOptions)
            }
            style={this.props.graphStyles.axisX}
          />
          <VictoryArea
            style={this.props.graphStyles.area}
            data={this.formatInteractionData()}
            x="date"
            y="duration"
          />
        </VictoryChart>
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return {
    firstInteraction: state.analytics.firstEverInteraction,
    zoomDomain: state.analytics.zoom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getZoom: date => dispatch(getZoom(date)),
    handleZoom: domain => dispatch(changeZoom(domain))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadingTimeline);
