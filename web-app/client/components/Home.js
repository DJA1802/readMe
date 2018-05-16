import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnalyticsFeatured, ArticleCardList } from '.';
import { fetchArticles } from '../store';

class Home extends Component {
  componentDidMount () {
    this.props.loadArticles();
  }

  render () {
    return (
      <React.Fragment>
        <AnalyticsFeatured />
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
      .slice(0, 3)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadArticles () {
      dispatch(fetchArticles());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
