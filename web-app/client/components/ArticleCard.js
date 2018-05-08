import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = props => {
  return (
    <div className="articleCard">
      <Link to={`/articles/${props.articleId}`}>{props.title}</Link>
    </div>
  );
};

export default ArticleCard;
