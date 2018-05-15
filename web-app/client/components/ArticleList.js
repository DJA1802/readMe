import React, { Component } from 'react';
import { ArticleListItem } from '../components';
import { connect } from 'react-redux';
import { Header, List, Segment } from 'semantic-ui-react';
import { fetchArticles } from '../store';

class ArticleList extends Component {
  componentDidMount () {
    this.props.loadArticles();
  }

  render () {
    const { articles, type } = this.props;
    const title = type === 'my-list' ? 'My List' : 'Archive';
    return (
      <div className="article-list-container">
        <Header as="h1" className="nimbus-mono-bold">
          {title}
        </Header>
        <List divided relaxed as={Segment} className="article-list">
          {articles &&
            articles.map(article => (
              <ArticleListItem
                key={article.id}
                articleId={article.id}
                title={article.title}
                type={type}
                publicationName={
                  article.publication && article.publication.name
                }
              />
            ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    articles:
      ownProps.type === 'my-list'
        ? state.articlesAll.filter(article => article.status === 'my-list')
        : state.articlesAll.filter(article => article.status === 'archive')
  };
};

const mapDispatchToProps = dispatch => ({
  loadArticles: () => dispatch(fetchArticles())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
