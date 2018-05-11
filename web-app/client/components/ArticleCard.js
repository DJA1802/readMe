import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';

class ArticleCard extends Component {
  state = { hover: false };

  handleMouseEnter = () => {
    console.log('mouse enter!');
    this.setState({ hover: true });
  };

  handleMouseLeave = () => {
    console.log('mouse leave!');
    this.setState({ hover: false });
  };

  render () {
    const { articleId, title } = this.props;
    return (
      <Card
        className="article-card"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        raised={this.state.hover && true}
        link
      >
        <Image
          // src="http://fillmurray.com/200/200"
          style={{ backgroundImage: `url(http://fillmurray.com/300/200)` }}
          className="article-card-image"
          as={Link}
          to={`/articles/${articleId}`}
        />
        <Card.Content header={title} as={Link} to={`/articles/${articleId}`} />

        <Card.Content extra className="card-icon-container">
          {this.state.hover && (
            <React.Fragment>
              <Icon
                name="archive"
                size="large"
                onClick={() => console.log('click')}
                link
              />
              <Icon
                name="trash outline"
                size="large"
                onClick={() => console.log('click')}
                link
              />
            </React.Fragment>
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default ArticleCard;
