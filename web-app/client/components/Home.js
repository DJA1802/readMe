import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnalyticsFeatured, ArticleCardList } from '.';
import { fetchArticles, fetchHomePageStats } from '../store';

class Home extends Component {
  componentDidMount () {
    this.props.loadArticles();
    this.props.loadStats();
  }

  render () {
    return (
      <React.Fragment>
        <AnalyticsFeatured stats={this.props.homePageStats} />
        <ArticleCardList
          articles={this.props.threeMostRecentArticles}
          className="article-card-list"
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    threeMostRecentArticles: state.articlesAll
      .filter(article => article.status === 'my-list')
      .sort((articleA, articleB) => {
        return new Date(articleB.createdAt) - new Date(articleA.createdAt);
      })
      .slice(0, 3),
    homePageStats: state.analytics.homePageStats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadArticles () {
      dispatch(fetchArticles());
    },
    loadStats () {
      dispatch(fetchHomePageStats());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
