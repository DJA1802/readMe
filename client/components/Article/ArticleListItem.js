import React, { Component } from 'react';
import { Icon, List, Transition, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  ButtonArchiveArticle,
  ButtonDeleteArticle,
  ButtonMyListArticle
} from '../../components';

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
          <Transition
            visible={this.state.hover}
            animation="fade"
            duration={200}
          >
            <div className="list-icon-container">
              {type === 'my-list' ? (
                <ButtonArchiveArticle articleId={articleId} />
              ) : (
                <ButtonMyListArticle articleId={articleId} />
              )}
              <ButtonDeleteArticle articleId={articleId} />
            </div>
          </Transition>
        </List.Content>
      </List.Item>
    );
  }
}

export default ArticleListItem;
