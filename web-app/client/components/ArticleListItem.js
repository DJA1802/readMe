// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { Container, Icon, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ArticleListItem = props => {
  const { articleId, title } = props;
  return (
    <List.Item
      as={Link}
      to={`/articles/${articleId}`}
      className="article-list-item"
    >
      <Icon name="book" />
      <List.Content>
        <List.Header>{title}</List.Header>
      </List.Content>
    </List.Item>
  );
};

export default ArticleListItem;
