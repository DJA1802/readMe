import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header, Button, Segment } from 'semantic-ui-react';
import {
  ReadingTimeGraphs,
  ReadingSources,
  AnalyticsTable
} from '../../components';
import {
  fetchInteractions,
  fetchFirstInteraction,
  fetchReadingHours,
  fetchPubCounts,
  fetchArticleStatsByDuration,
  fetchArticleStatsByInteraction
} from '../../store';
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
    this.props.getPubCounts();
    this.props.getArticleStats();
  }

  handleReadingTimeTabClick = () => this.setState({ activeTab: 'readingTime' });
  handleReadingSourceTabClick = () =>
    this.setState({ activeTab: 'readingSources' });
  handleArticleTabClick = () => this.setState({ activeTab: 'articleData' });

  render () {
    return (
      <Segment>
        <Header as="h1" className="nimbus-mono-bold">
          Analytics
        </Header>
        <div id="analytics-container">
          <Button.Group id="analytics-buttons">
            <Button onClick={this.handleReadingTimeTabClick}>
              Reading Time
            </Button>
            <Button onClick={this.handleReadingSourceTabClick}>
              Reading Sources
            </Button>
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
          {this.state.activeTab === 'readingSources' ? (
            <ReadingSources pubCounts={this.props.pubCounts} />
          ) : null}
          {this.state.activeTab === 'articleData' ? (
            <React.Fragment>
              <AnalyticsTable
                idRoute="articles"
                headers={['Article', 'Time Spent Reading']}
                displayKeys={['article', 'duration']}
                data={this.props.articlesByDuration}
              />
              <AnalyticsTable
                idRoute="articles"
                headers={['Article', 'Number of Times Opened']}
                displayKeys={['article', 'interactionCount']}
                data={this.props.articlesByInteraction}
              />
            </React.Fragment>
          ) : null}
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
    readingHours: state.analytics.readingHours,
    pubCounts: state.analytics.pubCounts,
    articlesByDuration: state.analytics.articlesByDuration,
    articlesByInteraction: state.analytics.articlesByInteraction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(fetchInteractions()),
    getFirstInteraction: () => dispatch(fetchFirstInteraction()),
    getReadingHours: () => dispatch(fetchReadingHours()),
    getPubCounts: () => dispatch(fetchPubCounts()),
    getArticleStats: () => {
      dispatch(fetchArticleStatsByDuration());
      dispatch(fetchArticleStatsByInteraction());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
