import React, { Component } from 'react';
import { ReadingTimeline, ReadingHours } from '../components';

const getStyles = () => {
  const ORANGE = '#FFC400';
  const RED = '#D32F2F';

  return {
    axisBottom: {
      axis: { stroke: 'black' },
      ticks: {
        size: 5,
        stroke: 'black',
        strokeWidth: 1,
        padding: 5
      },
      tickLabels: {
        fill: 'black',
        fontSize: 11,
        margin: 5
      }
    },
    area: {
      data: {
        strokeWidth: 1,
        fillOpacity: 0.7,
        stroke: ORANGE,
        fill: ORANGE
      }
    },
    bar: {
      data: {
        fillOpacity: 0.8,
        fill: RED
      }
    },
    title: {
      fontFamily: 'nimbus_monoregular',
      textAnchor: 'start',
      verticalAnchor: 'end',
      fill: '#000000',
      fontSize: '18px',
      fontWeight: 'bold'
    }
  };
};

const ReadingTimeGraphs = props => {
  return (
    <div>
      <ReadingTimeline
        interactions={props.interactions}
        userId={props.userId}
        firstInteraction={props.firstInteraction}
        graphStyles={getStyles()}
      />
      <ReadingHours
        interactions={props.interactions}
        userId={props.userId}
        readingHours={props.readingHours}
        graphStyles={getStyles()}
      />
    </div>
  );
};

export default ReadingTimeGraphs;
