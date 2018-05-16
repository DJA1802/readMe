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
import { getZoom, changeZoom } from '../store';

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

  // handleZoom (domain) {
  //   this.setState({ zoomDomain: domain });
  // }

  render () {
    // const dateOptions = { month: 'short', day: 'numeric' };

    return (
      <Segment>
        <VictoryChart
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.props.zoomDomain}
              onZoomDomainChange={this.props.handleZoom}
            />
          }
        >
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
              brushDimensions="x"
              brushDomain={this.props.zoomDomain}
              onBrushDomainChange={this.props.handleZoom}
            />
          }
        >
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