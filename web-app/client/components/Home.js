// Single Article Page Component (i.e. where article is read from)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnalyticsFeatured, ArticleCardList } from '.';
import { fetchAllArticles } from '../store';

class Home extends Component {
  componentDidMount () {
    this.props.getAllArticles();
  }

  render () {
    return (
      <React.Fragment>
        <ArticleCardList
          articles={this.props.threeMostRecentArticles}
          className="article-card-list"
        />
        <AnalyticsFeatured />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    threeMostRecentArticles: state.articlesAll
      .sort((articleA, articleB) => {
        return new Date(articleB.updatedAt) - new Date(articleA.updatedAt);
      })
      .slice(0, 3)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllArticles: () => dispatch(fetchAllArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
