// Single Article Page Component (i.e. where article a user reads an article)
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getArticle, clearArticle, fetchArticles } from '../../store';
import reactHtmlParser from 'react-html-parser';
import { Icon, Header, Segment } from 'semantic-ui-react';
import {
  getLocalInteractions,
  addInteractionToLocalStorage,
  updateLastInteractionEndTime
} from '../../utils/helperFuncs';
import history from '../../history';
import {
  VisContainer,
  Message,
  NavbarTop,
  NavbarSideMobile
} from '../../components';

class Article extends Component {
  constructor (props) {
    super(props);
    this.updateInterval = null;
  }

  componentDidMount () {
    const { handleFetchArticles, handleGetArticle } = this.props;

    handleFetchArticles();
    handleGetArticle();
    addInteractionToLocalStorage(this.props.match.params.id); // articleId. Cannot use article.id because "article" as a prop from Redux is not yet available.
    this.updateLastInteractionIntervalID = setInterval(
      updateLastInteractionEndTime,
      1000
    );
  }

  componentWillUnmount () {
    const { handleClearArticle, transferLocalStorageToDb } = this.props;

    clearInterval(this.updateLastInteractionIntervalID);
    transferLocalStorageToDb(getLocalInteractions());
    handleClearArticle();

    // change background color back to default
    document.getElementsByTagName('html')[0].style.backgroundColor = 'white';
    document.getElementById('app').style.backgroundColor = 'white';
  }

  render () {
    const { article } = this.props;
    const {
      fontSize,
      fontFamily,
      color,
      backgroundColor,
      lineHeight
    } = this.props.style;

    let title, sourceUrl, author, content, publication, publicationDate;

    article &&
      ({
        title,
        sourceUrl,
        author,
        content,
        publication,
        publicationDate
      } = article);
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    };

    // change background color based on style state
    document.getElementsByTagName(
      'html'
    )[0].style.backgroundColor = backgroundColor;
    document.getElementById('app').style.backgroundColor = backgroundColor;

    return (
      <React.Fragment>
        <NavbarTop />
        <Message />
        <VisContainer>
          <div id="page-container">
            <NavbarSideMobile />
            {article ? (
              <div id="single-article" style={{ fontSize, fontFamily, color }}>
                <Header as="h1" style={{ color }} className="article-title">
                  {title}
                </Header>
                Originally from{' '}
                <a href={sourceUrl}>{publication && publication.name}</a>
                <p className="article-author">
                  {' '}
                  {author ? `by ${author.name}` : null}
                </p>
                <p>
                  {publicationDate
                    ? `Date Published: ${new Date(
                        publicationDate
                      ).toLocaleDateString('en-US', dateOptions)}`
                    : null}
                </p>
                <div className="article-content" style={{ lineHeight }}>
                  {reactHtmlParser(content)}
                </div>
                <Segment onClick={history.goBack} className="back-button">
                  <Icon name="long arrow left" />back
                </Segment>
              </div>
            ) : (
              <p>Loading... </p>
            )}
          </div>
        </VisContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.articlesAll.filter(
      article => article.id === state.articleSelected
    )[0],
    style: state.articleStyle
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const articleId = Number(ownProps.match.params.id);
  return {
    handleGetArticle: () => {
      dispatch(getArticle(articleId));
    },
    handleClearArticle: () => dispatch(clearArticle()),
    handleFetchArticles: () => dispatch(fetchArticles())
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Article)
);
