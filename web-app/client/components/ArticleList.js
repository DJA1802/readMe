// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { ArticleListItem } from '../components';
import { connect } from 'react-redux';
import { Header, List, Segment } from 'semantic-ui-react';

const ArticleList = props => {
  const { articles, type } = props;
  const title = type === 'my-list' ? 'My List' : 'Archive';
  return (
    <div className="article-list-container">
      <Header as="h1">{title}</Header>
      <List divided relaxed as={Segment} className="article-list">
        {articles &&
          articles.map(article => (
            <ArticleListItem
              key={article.id}
              articleId={article.id}
              title={article.title}
              type={type}
            />
          ))}
      </List>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    articles:
      ownProps.type === 'my-list'
        ? state.articlesAll.filter(article => article.status === 'my-list')
        : state.articlesAll.filter(article => article.status === 'archive')
  };
};

export default connect(mapStateToProps)(ArticleList);
