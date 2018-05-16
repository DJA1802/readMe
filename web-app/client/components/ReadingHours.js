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

const getMaxInteractions = data => {
  return data.reduce(
    (max, p) => (p.interactionCount > max ? p.interactionCount : max),
    data[0].interactionCount
  );
};

const ReadingHours = props => {
  return (
    <Segment>
      <VictoryChart width={600} domainPadding={10}>
        <VictoryLabel
          text="Number of Articles Opened By Hour of Day(All-Time)"
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
          dependentAxis
          domain={[0, getMaxInteractions(bucketHours(props.readingHours)) + 1]} // max + 1
          offsetX={50}
          orientation="left"
          standalone={false}
          style={props.graphStyles.axisY}
        />
        <VictoryAxis
          independentAxis
          tickValues={_.range(24)}
          tickFormat={t => formattedHour(t)}
          tickLabelComponent={<VictoryLabel angle={90} />}
          style={props.graphStyles.axisX}
        />
        <VictoryLabel text="Hour of Day" textAnchor="middle" x={300} y={345} />
      </VictoryChart>
    </Segment>
  );
};

export default ReadingHours;
