import React from 'react';
import { Statistic } from 'semantic-ui-react';

const AnalyticsStat = ({ value, label }) => {
  return (
    <Statistic>
      <Statistic.Value>{value}</Statistic.Value>
      <Statistic.Label>{label}</Statistic.Label>
    </Statistic>
  );
};

export default AnalyticsStat;
