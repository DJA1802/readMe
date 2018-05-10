// Single Article Page Component (i.e. where article a user reads an article)
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticle, postCachedInteractions } from '../store';
import reactHtmlParser from 'react-html-parser';
import { Container, Header } from 'semantic-ui-react';
import {
  localInteractionsExist,
  getLocalInteractions,
  setLocalInteractions,
  getLastMemberOf
} from '../utils/helperFuncs';

class Article extends Component {
  constructor (props) {
    super(props);
    this.updateInterval = null;
    this.addInteractionToLocalStorage = this.addInteractionToLocalStorage.bind(
      this
    );
    this.updateLastInteractionEndTime = this.updateLastInteractionEndTime.bind(
      this
    );
  }

  componentDidMount () {
    this.props.fetchArticle();
    this.addInteractionToLocalStorage();
    this.updateLastInteractionIntervalID = setInterval(
      this.updateLastInteractionEndTime,
      1000
    );
  }

  componentWillUnmount () {
    clearInterval(this.updateLastInteractionIntervalID);
    this.props.transferLocalStorageToDb(getLocalInteractions());
  }

  addInteractionToLocalStorage () {
    const newInteraction = {
      articleId: Number(this.props.match.params.id),
      startTime: new Date(),
      endTime: new Date()
    };
    if (localInteractionsExist()) {
      const existingInteractions = getLocalInteractions();
      setLocalInteractions(existingInteractions.concat(newInteraction));
    } else {
      setLocalInteractions([newInteraction]);
    }
  }

  updateLastInteractionEndTime () {
    if (localInteractionsExist()) {
      const existingInteractions = getLocalInteractions();
      const lastInteraction = getLastMemberOf(existingInteractions);
      const updatedLastInteraction = Object.assign({}, lastInteraction, {
        endTime: new Date()
      });
      const updatedInteractions =
        lastInteraction.articleId === Number(this.props.match.params.id) &&
        existingInteractions
          .slice(0, existingInteractions.length - 1)
          .concat(updatedLastInteraction);
      setLocalInteractions(updatedInteractions);
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
