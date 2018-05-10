// Single Article Page Component (i.e. where article a user reads an article)
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticle } from '../store';
import reactHtmlParser from 'react-html-parser';
import { Container, Header } from 'semantic-ui-react';

class Article extends Component {
  constructor (props) {
    super(props);
    this.updateInterval = null;
    this.addInteractionToLocalStorage = this.addInteractionToLocalStorage.bind(
      this
    );
    this.updateInteractionEndTime = this.updateInteractionEndTime.bind(this);
  }

  componentDidMount () {
    this.props.fetchArticle();
    this.addInteractionToLocalStorage();
    this.updateIntervalID = setInterval(this.updateInteractionEndTime, 1000);
  }

  componentWillUnmount () {
    clearInterval(this.updateIntervalID);
  }

  addInteractionToLocalStorage () {
    const interaction = {
      articleId: Number(this.props.match.params.id),
      startTime: new Date(),
      endTime: new Date()
    };
    if (localStorage.getItem('readmeIacts')) {
      let existingStorage = JSON.parse(localStorage.getItem('readmeIacts'));
      let newStorage = JSON.stringify(existingStorage.concat(interaction));
      localStorage.setItem('readmeIacts', newStorage);
    } else {
      localStorage.setItem('readmeIacts', JSON.stringify([interaction]));
    }
  }

  updateInteractionEndTime () {
    if (localStorage.getItem('readmeIacts')) {
      const oldLocalStorage = JSON.parse(localStorage.getItem('readmeIacts'));
      const lastInteraction = oldLocalStorage[oldLocalStorage.length - 1];
      const updatedInteraction = Object.assign({}, lastInteraction, {
        endTime: new Date()
      });
      const updatedLocalStorage =
        lastInteraction.articleId === Number(this.props.match.params.id) &&
        JSON.stringify(
          oldLocalStorage
            .slice(0, oldLocalStorage.length - 1)
            .concat(updatedInteraction)
        );
      localStorage.setItem('readmeIacts', updatedLocalStorage);
      console.log(localStorage);
      console.log(JSON.parse(localStorage.readmeIacts));
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
