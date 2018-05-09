// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { ArticleCard } from '../components';
import { Card, Container, Header } from 'semantic-ui-react';

const ArticleCardList = props => {
  return (
    <Container>
      <Header as="h2">Recently-saved articles</Header>
      <Card.Group className="article-card-list">
        {props.articles.map(article => (
          <ArticleCard
            key={article.id}
            articleId={article.id}
            title={article.title}
          />
        ))}
      </Card.Group>
    </Container>
  );
};

export default ArticleCardList;
