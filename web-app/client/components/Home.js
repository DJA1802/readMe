import React from 'react';
import { connect } from 'react-redux';
import { AnalyticsFeatured, ArticleCardList } from '.';

const Home = props => {
  return (
    <React.Fragment>
      <ArticleCardList
        articles={props.threeMostRecentArticles}
        className="article-card-list"
      />
      <AnalyticsFeatured />
    </React.Fragment>
  );
};

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

export default connect(mapStateToProps)(Home);
