import React from 'react';
import PropTypes from 'prop-types';
import { VictoryLabel, VictoryTooltip, VictoryPie } from 'victory';
import visuStyles from '../utils/visualizationStyles';
const chartStyle = visuStyles();

const CustomLabel = props => {
  return (
    <g>
      <VictoryLabel {...props} />
      <VictoryTooltip
        {...props}
        x={225}
        y={250}
        text={`${props.filter(props.text)} from\n ${props.text}`}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        width={100}
        height={100}
        style={{ fontSize: 16 }}
        flyoutStyle={chartStyle.pieLabel}
      />
    </g>
  );
};

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents;
CustomLabel.propTypes = { text: PropTypes.string };

const ReadingSources = props => {
  return (
    <div>
      <VictoryLabel
        text="Your Sources"
        textAnchor="middle"
        x={25}
        y={24}
        style={chartStyle.title}
      />
      <VictoryPie
        width={450}
        style={chartStyle.pie}
        padAngle={1}
        innerRadius={80}
        labelRadius={160}
        labels={d => d.x}
        labelComponent={
          <CustomLabel
            filter={name =>
              props.pubCounts.filter(obj => obj.publication === name)[0]
                .articles
            }
          />
        }
        x="publication"
        y="articles"
        data={props.pubCounts}
      />
    </div>
  );
};

export default ReadingSources;
