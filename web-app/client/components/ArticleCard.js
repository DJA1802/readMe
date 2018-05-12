import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { ButtonArchiveArticle, ButtonDeleteArticle } from '.';

class ArticleCard extends Component {
  state = { hover: false };

  handleMouseEnter = () => {
    this.setState({ hover: true });
  };

  handleMouseLeave = () => {
    this.setState({ hover: false });
  };

  render () {
    const { articleId, publicationName, title } = this.props;
    return (
      <Card
        className="article-card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        raised={this.state.hover && true}
        link
      >
        <Image
          style={{ backgroundImage: `url(http://fillmurray.com/300/200)` }}
          className="article-card-image"
          as={Link}
          to={`/articles/${articleId}`}
        />
        <Card.Content header={title} as={Link} to={`/articles/${articleId}`} />

        <Card.Content extra className="card-extra">
          <div className="card-pubname">{publicationName}</div>
          {this.state.hover && (
            <div className="card-icon-container">
              <ButtonArchiveArticle articleId={articleId} />
              <ButtonDeleteArticle articleId={articleId} />
            </div>
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default ArticleCard;
