import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Segment } from 'semantic-ui-react';
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
    this.state = { activeTab: 'readingTime' };
  }

  componentDidMount () {
    this.props.loadData();
    this.props.getFirstInteraction();
    this.props.getReadingHours();
  }

  handleReadingTimeTabClick = () => this.setState({ activeTab: 'readingTime' });
  handleReadingSourceTabClick = () =>
    this.setState({ activeTab: 'readingSources' });
  handleArticleTabClick = () => this.setState({ activeTab: 'articleData' });

  render () {
    return (
      <Segment>
        <Header as="h1">Analytics</Header>
        <div id="analytics-container">
          <Button.Group className="analytics-buttons">
            <Button onClick={this.handleReadingTimeTabClick}>
              Reading Time
            </Button>
            <Button onClick={this.handleSourceTabClick}>Reading Sources</Button>
            <Button onClick={this.handleArticleTabClick}>Article Data</Button>
          </Button.Group>

          {this.state.activeTab === 'readingTime' ? (
            <ReadingTimeGraphs
              interactions={this.props.interactions}
              userId={this.props.userId}
              firstInteraction={this.props.firstInteraction}
              readingHours={this.props.readingHours}
            />
          ) : null}
          {/*{this.state.activeTab === 'readingSources' ? (
          <ReadingSources />
        ) : null}
        {this.state.activeTab === 'articleData' ? (
          <ArticleData />
        ) : null}*/}
        </div>
      </Segment>
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
