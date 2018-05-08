// Single Article Page Component (i.e. where article is read from)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticle } from '../store';
import reactHtmlParser from 'react-html-parser';

class Article extends Component {
  componentDidMount () {
    this.props.fetchArticle();
  }

  render () {
    // console.log('article', this.props.article);
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
        <React.Fragment>
          <Link to={`${sourceUrl}`}>
            <h1>{title}</h1>
          </Link>
          <p> {author ? `Author: ${author.name}` : null}</p>
          <p>
            {publicationDate
              ? `Date Published: ${new Date(publicationDate).toLocaleDateString(
                  'en-US',
                  dateOptions
                )}`
              : null}
          </p>
          {reactHtmlParser(content)}
        </React.Fragment>
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
