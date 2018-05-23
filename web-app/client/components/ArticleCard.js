import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Header, Image, Transition } from 'semantic-ui-react';
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
    let { articleId, publicationName, title, thumbnail } = this.props;
    let defaultThumb;
    if (!thumbnail) {
      defaultThumb = true;
      thumbnail = '/landing-page-1.jpg';
    }

    return (
      <Card
        className="article-card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        raised={this.state.hover && true}
        as={Link}
        to={`/articles/${articleId}`}
      >
        <Image
          crossOrigin="anonymous"
          src={thumbnail}
          className="article-card-image"
          to={`/articles/${articleId}`}
        >
          {defaultThumb && <div id="icon-default-image" />}
        </Image>

        <Card.Content>
          <Header as="h3" className="nimbus-mono-reg">
            {title}
          </Header>
        </Card.Content>

        <Card.Content extra className="card-extra">
          <div className="card-pubname">{publicationName}</div>
          <Transition
            visible={this.state.hover}
            animation="fade"
            duration={200}
          >
            <div className="card-icon-container">
              <ButtonArchiveArticle articleId={articleId} />
              <ButtonDeleteArticle articleId={articleId} />
            </div>
          </Transition>
        </Card.Content>
      </Card>
    );
  }
}

export default ArticleCard;
