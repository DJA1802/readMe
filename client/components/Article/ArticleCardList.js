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
            You don&apos;t have any articles saved in your list. When you're
            browsing the web and come across an article you want to save to read
            later using readMe, you have two options to do this:
            <ol>
              <li>
                Paste your article URL via the `+` icon at the top right of the
                homepage
              </li>
              <li>
                Download the readMe{' '}
                <a href="https://chrome.google.com/webstore/search/readme%20browser%20extension?hl=en-US">
                  Chrome Extension
                </a>. Hit the readMe icon in the top right of your browser
                toolbar and <em>voila!</em> – your article is ready to read from
                the comfort of our app.
              </li>
            </ol>
          </div>
        )}
      </Card.Group>
    </Container>
  );
};

export default ArticleCardList;
