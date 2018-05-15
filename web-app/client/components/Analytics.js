import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button } from 'semantic-ui-react';
import { ReadingTimeGraphs } from '../components';
import {
  fetchInteractions,
  fetchFirstInteraction,
  fetchReadingHours
} from '../store';
import _ from 'lodash';

class Analytics extends Component {
  constructor () {
    super();
    this.state = { activeTab: 'readingTimeGraphs' };
  }

  componentDidMount () {
    this.props.loadData();
    this.props.getFirstInteraction();
    this.props.getReadingHours();
  }

  handleReadingTimeTabClick = () =>
    this.setState({ activeTab: 'readingTimeGraphs' });

  render () {
    return (
      <div id="analytics-container">
        <Header as="h1">Analytics</Header>
        <Button attached="left" onClick={this.handleReadingTimeTabClick}>
          Reading Time
        </Button>
        {/*<Button onClick={this.handle} />*/}
        {this.state.activeTab === 'readingTimeGraphs' ? (
          <ReadingTimeGraphs
            interactions={this.props.interactions}
            userId={this.props.userId}
            firstInteraction={this.props.firstInteraction}
            readingHours={this.props.readingHours}
          />
        ) : (
          <div />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    interactions: state.interactions,
    firstInteraction: state.analytics.firstEverInteraction,
    readingHours: state.analytics.readingHours
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(fetchInteractions()),
    getFirstInteraction: () => dispatch(fetchFirstInteraction()),
    getReadingHours: () => dispatch(fetchReadingHours())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
