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
    const { articleId, publicationName, title, thumbnail } = this.props;
    return (
      <Card
        className="article-card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        raised={this.state.hover && true}
        link
      >
        <Image
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
          className="article-card-image"
          as={Link}
          to={`/articles/${articleId}`}
        />
        <Card.Content as={Link} to={`/articles/${articleId}`}>
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
