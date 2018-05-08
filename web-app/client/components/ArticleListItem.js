// Single Article Page Component (i.e. where article is read from)
import React from 'react';
import { List, Segment } from 'semantic-ui-react';

const ArticleListItem = props => {
  const { articleId, title } = props;
  return (
    <List.Item>
      <List.Content>
        <Segment>
          <List.Header>{title}</List.Header>
        </Segment>
      </List.Content>
    </List.Item>
  );
};

export default ArticleListItem;
