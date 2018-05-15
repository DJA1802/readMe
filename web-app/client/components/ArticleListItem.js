import React, { Component } from 'react';
import { Icon, List } from 'semantic-ui-react';
import { Link, Header } from 'react-router-dom';
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
    const { articleId, title, type, publicationName } = this.props;
    return (
      <List.Item
        as={Link}
        to={`/articles/${articleId}`}
        className="article-list-item"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Icon name="book" />
        <List.Content as={Header} className="list-item-title">
          {title}
        </List.Content>
        <List.Content className="list-item-extra">
          <div className="list-item-pubname">{publicationName}</div>
          {this.state.hover && (
            <div className="list-icon-container">
              {type === 'my-list' ? (
                <ButtonArchiveArticle articleId={articleId} />
              ) : (
                <ButtonMyListArticle articleId={articleId} />
              )}
              <ButtonDeleteArticle articleId={articleId} />
            </div>
          )}
        </List.Content>
      </List.Item>
    );
  }
}

export default ArticleListItem;
