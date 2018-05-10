// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { ArticleListItem } from '../components';
import { connect } from 'react-redux';
import { Header, List, Segment } from 'semantic-ui-react';

const ArticleList = props => {
  const { articles, title } = props;
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
            />
          ))}
      </List>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    articles: state.articlesAll
  };
};

export default connect(mapStateToProps)(ArticleList);
