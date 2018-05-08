// Single Article Page Component (i.e. where article a user reads an article)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticle } from '../store';
import reactHtmlParser from 'react-html-parser';
import { Container, Header } from 'semantic-ui-react';

class Article extends Component {
  componentDidMount () {
    this.props.fetchArticle();
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
          <p className="article-author"> {author ? `by ${author.name}` : null}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Article);
