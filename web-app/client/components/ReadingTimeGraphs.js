import React, { Component } from 'react';
import { ReadingTimeline, ReadingHours } from '../components';

const ReadingTimeGraphs = props => {
  return (
    <div>
      <ReadingTimeline
        interactions={props.interactions}
        userId={props.userId}
        firstInteraction={props.firstInteraction}
      />
      <ReadingHours
        interactions={props.interactions}
        userId={props.userId}
        readingHours={props.readingHours}
      />
    </div>
  );
};

export default ReadingTimeGraphs;
