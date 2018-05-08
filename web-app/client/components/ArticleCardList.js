// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { ArticleCard } from '../components';

const ArticleCardList = props => {
  return (
    <React.Fragment>
      <h2>Recently-saved articles</h2>
      <div className="articleCardList">
        {props.articles.map(article => (
          <ArticleCard key={article.id} articleId={article.id} title={article.title} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ArticleCardList;
