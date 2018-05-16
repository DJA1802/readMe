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
        x={200}
        y={250}
        text={`${props.text} reads`}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        width={100}
        height={100}
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
        text="Publications You Read"
        textAnchor="middle"
        x={25}
        y={24}
        style={chartStyle.title}
      />
      <VictoryPie
        style={chartStyle.pie}
        innerRadius={100}
        labelRadius={120}
        labels={d => d.articles}
        labelComponent={<CustomLabel />}
        data={props.pubCounts}
      />
    </div>
  );
};

export default ReadingSources;
