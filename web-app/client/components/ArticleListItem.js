import React, { Component } from 'react';
import { Icon, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  ButtonArchiveArticle,
  ButtonDeleteArticle,
  ButtonMyListArticle
} from '.';

class ArticleListItem extends Component {
  state = { hover: false };

  handleMouseEnter = () => {
    this.setState({ hover: true });
  };

  handleMouseLeave = () => {
    this.setState({ hover: false });
  };

  render () {
    const { articleId, title, type } = this.props;
    return (
      <List.Item
        className="article-list-item"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Icon name="book" />
        <List.Content as={Link} to={`/articles/${articleId}`}>
          <List.Header>{title}</List.Header>
        </List.Content>
        <List.Content className="list-icon-container">
          {this.state.hover && (
            <React.Fragment>
              {type === 'my-list' ? (
                <ButtonArchiveArticle />
              ) : (
                <ButtonMyListArticle />
              )}
              <ButtonDeleteArticle articleId={articleId} />
            </React.Fragment>
          )}
        </List.Content>
      </List.Item>
    );
  }
}

export default ArticleListItem;
