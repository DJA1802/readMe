// Single Article Page Component (i.e. where article is read from)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchArticle } from '../store';
import ReactHtmlParser from 'react-html-parser';

// steps to get article content:
// 1. pass url into Mercury HTTP Request
// 2. do something with response body (clean up and store in DB)
// 3. send cleaned up info to props
// 4. get article info props in this component and render

class Article extends Component {
  componentDidMount () {
    this.props.fetchArticle();
  }

  render () {
    // console.log('article', this.props.article);
    const article = this.props.article;
    const { title, url, author, content, date_published } = article;

    return (
      article && (
        <React.Fragment>
          <Link to={`${url}`}>
            <h1>{title}</h1>
          </Link>
          <p>Author: {author ? author : 'N/A'}</p>
          <p>Date Published: {date_published ? date_published : 'N/A'}</p>
          {ReactHtmlParser(content)}
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
