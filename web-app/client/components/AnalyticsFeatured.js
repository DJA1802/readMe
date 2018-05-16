// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { Container, Header, Statistic } from 'semantic-ui-react';
import { AnalyticsStat } from '../components';

const AnalyticsFeatured = () => {
  const dummyData = [
    { value: '2 hr 3 min', label: 'spent reading\nthis week' },
    { value: 13, label: 'different\npublications' },
    { value: '8 hr 1 min', label: 'est. time to\nfinish your list' }
  ];

  return (
    <Container className="analytics-featured">
      <Header as="h2" className="nimbus-mono-bold">
        Featured Analytics
      </Header>
      <Statistic.Group widths="three" size="small">
        {dummyData.map((datum, idx) => (
          <AnalyticsStat key={idx} value={datum.value} label={datum.label} />
        ))}
      </Statistic.Group>
    </Container>
  );
};

export default AnalyticsFeatured;
