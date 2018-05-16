// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { Container, Header, Statistic } from 'semantic-ui-react';
import { AnalyticsStat } from '../components';

const AnalyticsFeatured = ({ stats }) => {
  return (
    <Container className="analytics-featured">
      <Header as="h2" className="nimbus-mono-bold">
        Featured Analytics
      </Header>
      <Statistic.Group widths="three" size="small">
        {stats.map((stat, idx) => (
          <AnalyticsStat key={idx} value={stat.value} label={stat.label} />
        ))}
      </Statistic.Group>
    </Container>
  );
};

export default AnalyticsFeatured;
