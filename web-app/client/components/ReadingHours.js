import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import _ from 'lodash';

const formattedHour = num => {
  const hr = num + 1;
  if (hr <= 12) return String(hr) + 'am';
  if (hr > 12) return String(hr - 12) + 'pm';
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
      <VictoryChart domainPadding={10}>
        <VictoryLabel
          text="Reading Frequency by Hour"
          textAnchor="middle"
          x={245}
          y={20}
        />
        <VictoryBar
          style={{ data: { fill: '#c43a31' } }}
          data={bucketHours(props.readingHours)}
          x="hour"
          y="interactionCount"
          scale={{ x: 'linear' }}
        />
        <VictoryAxis
          tickValues={_.range(24)}
          // tickFormat={t => formattedHour(t)}
          tickLabelComponent={<VictoryLabel angle={90} />}
        />
        <VictoryLabel text="Hour of Day" textAnchor="middle" x={245} y={290} />
      </VictoryChart>
    </Segment>
  );
};

export default ReadingHours;
