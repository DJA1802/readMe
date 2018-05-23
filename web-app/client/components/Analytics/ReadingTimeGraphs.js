import React from 'react';
import { ReadingTimeline, ReadingHours } from '../../components';
import visuStyles from '../../utils/visualizationStyles';

const ReadingTimeGraphs = props => {
  return (
    <div>
      <ReadingTimeline
        interactions={props.interactions}
        userId={props.userId}
        firstInteraction={props.firstInteraction}
        graphStyles={visuStyles()}
      />
      <ReadingHours
        interactions={props.interactions}
        userId={props.userId}
        readingHours={props.readingHours}
        graphStyles={visuStyles()}
      />
    </div>
  );
};

export default ReadingTimeGraphs;
