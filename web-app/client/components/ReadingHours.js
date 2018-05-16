import React from 'react';
import { Segment } from 'semantic-ui-react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import _ from 'lodash';

const formattedHour = hr => {
  if (+hr === 0) return '12am';
  if (+hr < 12) return String(hr) + 'am';
  if (+hr === 12) return '12pm';
  if (+hr > 12) return String(hr - 12) + 'pm';
};

const bucketHours = readingHoursObj => {
  const hourBuckets = {};
  for (let i = 0; i < 24; i++) {
    hourBuckets[i] = 0;
  }

  readingHoursObj.forEach(obj => {
    hourBuckets[obj.hour] = obj.interactionCount;
  });

  const formattedData = [];
  Object.keys(hourBuckets).forEach(hour => {
    formattedData.push({ hour: hour, interactionCount: hourBuckets[hour] });
  });

  return formattedData;
};

const ReadingHours = props => {
  return (
    <Segment>
      <VictoryChart>
        <VictoryLabel
          text="Reading Frequency by Hour"
          x={25}
          y={24}
          style={props.graphStyles.title}
        />
        <VictoryBar
          data={bucketHours(props.readingHours)}
          x="hour"
          y="interactionCount"
          scale={{ x: 'linear' }}
          style={props.graphStyles.bar}
        />
        <VictoryAxis
          tickValues={_.range(24)}
          tickFormat={t => formattedHour(t)}
          tickLabelComponent={<VictoryLabel angle={90} />}
          style={props.graphStyles.axisBottom}
        />
        <VictoryLabel text="Hour of Day" textAnchor="middle" x={245} y={290} />
      </VictoryChart>
    </Segment>
  );
};

export default ReadingHours;
