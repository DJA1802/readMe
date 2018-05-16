// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { ArticleCard } from '../components';
import { Card, Container, Header } from 'semantic-ui-react';

const ArticleCardList = props => {
  return (
    <Container>
      <Header as="h2" className="nimbus-mono-bold">
        Recently-saved articles
      </Header>
      <Card.Group className="article-card-list">
        {props.articles.length ? (
          props.articles.map(article => (
            <ArticleCard
              key={article.id}
              articleId={article.id}
              title={article.title}
              publicationName={article.publication && article.publication.name}
              thumbnail={article.thumbnailUrl}
            />
          ))
        ) : (
          <div id="no-articles-message">
            You don&apos;t have any articles saved in your list
          </div>
        )}
      </Card.Group>
    </Container>
  );
};

export default ArticleCardList;
