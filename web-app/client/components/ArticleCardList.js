// Single Article Page Component (i.e. where article is read from)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles } from '../store';
import { ArticleCard } from '../components';

class ArticleCardList extends Component {
  componentDidMount () {
    this.props.getAllArticles();
  }

  render () {
    return (
      <React.Fragment>
        <h1>My Articles</h1>
        <div className="articleList">
          {this.props.articlesAll.map(article => (
            <ArticleCard
              key={article.id}
              id={article.id}
              title={article.title}
            />
          ))}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    articlesAll: state.articlesAll
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllArticles: () => dispatch(fetchAllArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCardList);
