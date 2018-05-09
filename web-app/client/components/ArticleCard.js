import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';

const ArticleCard = props => {
  const { articleId, title } = props;
  return (
    <Card className="article-card" as={Link} to={`/articles/${articleId}`}>
      <Image src="http://fillmurray.com/200/200" />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
      </Card.Content>
    </Card>
  );
};

export default ArticleCard;
