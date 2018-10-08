// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { ArticleCard } from '../../components';
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
            <p>You don&apos;t have any articles saved in your list.</p>{' '}
            <p>
              When you&apos;re browsing the web and come across an article you
              want to read later using readMe, you have two options:
            </p>
            <ol>
              <li>
                Click the "+" icon at the top right of the homepage, paste the
                URL of the article in the resulting input field, and click
                "Save".
              </li>
              <li>
                Download the readMe{' '}
                <a href="https://chrome.google.com/webstore/search/readme%20browser%20extension?hl=en-US">
                  Chrome Extension
                </a>. Once installed, click the readMe icon in the top right of
                your browser toolbar and <em>voila!</em> – your article is ready
                to read from the customizable comfort of our app.
              </li>
            </ol>
          </div>
        )}
      </Card.Group>
    </Container>
  );
};

export default ArticleCardList;
