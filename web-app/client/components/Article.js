// Single Article Page Component (i.e. where article a user reads an article)
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticle } from '../store';
import reactHtmlParser from 'react-html-parser';
import { Container, Header } from 'semantic-ui-react';

class Article extends Component {
  componentDidMount () {
    this.props.fetchArticle();
    this.addInteractionToLocalStorage();
    setInterval(this.updateInteractionEndTime, 2000);
  }

  addInteractionToLocalStorage () {
    console.log(this.props);
    const interaction = {
      articleId: Number(this.props.match.params.id),
      startTime: new Date(),
      endTime: new Date()
    };
    //localStorage.removeItem('readmeInteractions');
    if (localStorage.getItem('readmeInteractions')) {
      let existingStorage = JSON.parse(
        localStorage.getItem('readmeInteractions')
      );
      let newStorage = {
        interactions: existingStorage.interactions.concat(interaction)
      };
      localStorage.setItem('readmeInteractions', JSON.stringify(newStorage));
    } else {
      localStorage.setItem(
        'readmeInteractions',
        JSON.stringify({ interactions: [interaction] })
      );
    }
  }

  updateInteractionEndTime () {
    console.log(this);
    if (localStorage.getItem('readmeInteractions')) {
      const existingStorage = JSON.parse(
        localStorage.getItem('readmeInteractions')
      );
      const lastInteraction =
        existingStorage.interactions[existingStorage.interactions.length - 1];
      const updatedInteraction = Object.assign({}, lastInteraction, {
        endTime: new Date()
      });
      const updatedLocalStorage = {
        interactions: existingStorage.interactions
          .slice(0, existingStorage.length - 1)
          .concat(updatedInteraction)
      };
      localStorage.setItem(
        'readmeInteractions',
        JSON.stringify(updatedLocalStorage)
      );
      console.log(localStorage);
    }
  }

  render () {
    const article = this.props.article;
    const { title, sourceUrl, author, content, publicationDate } = article;
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    };

    return (
      article && (
        <div className="single-article">
          <Header as="h1">{title}</Header>
          Originally from <a href={sourceUrl}>[publication name]</a>
          <p className="article-author">
            {' '}
            {author ? `by ${author.name}` : null}
          </p>
          <p>
            {publicationDate
              ? `Date Published: ${new Date(publicationDate).toLocaleDateString(
                  'en-US',
                  dateOptions
                )}`
              : null}
          </p>
          {reactHtmlParser(content)}
        </div>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.article
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const articleId = Number(ownProps.match.params.id);
  return {
    fetchArticle: () => dispatch(fetchArticle(articleId))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Article)
);
