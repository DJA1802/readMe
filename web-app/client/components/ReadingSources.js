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
        text={`${props.text}`}
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
  console.log('PROPS ==>', props.pubCounts);
  return (
    <div>
      <VictoryPie
        style={chartStyle.pie}
        innerRadius={100}
        labelRadius={120}
        labels={d => d.y}
        labelComponent={<CustomLabel />}
        data={[
          { x: 1, y: 5 },
          { x: 2, y: 4 },
          { x: 3, y: 2 },
          { x: 4, y: 3 },
          { x: 5, y: 1 }
        ]}
      />
    </div>
  );
};

export default ReadingSources;
