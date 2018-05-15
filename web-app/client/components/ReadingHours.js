import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';

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
          data={props.readingHours}
          x="hour"
          y="interactionCount"
          scale={{ x: 'linear' }}
        />
        <VictoryAxis
          tickValues={[
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23
          ]}
        />
        <VictoryLabel text="Hour of Day" textAnchor="middle" x={245} y={290} />
      </VictoryChart>
    </Segment>
  );
};

export default ReadingHours;
