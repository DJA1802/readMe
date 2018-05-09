// Single Article Page Component (i.e. where article is read from)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Container, Sidebar } from 'semantic-ui-react';
import {
  AnalyticsFeatured,
  ArticleCardList,
  NavbarSideDesktop,
  NavbarSideMobile
} from '.';
import { fetchAllArticles } from '../store';
import { desktop } from '../utils/constants';

class Home extends Component {
  componentDidMount () {
    this.props.getAllArticles();
  }

  render () {
    return (
      <Container id="home-container">
        <MediaQuery minWidth={desktop}>
          <NavbarSideDesktop />
        </MediaQuery>
        <Container id="home-content">
          <ArticleCardList
            articles={this.props.threeMostRecentArticles}
            className="article-card-list"
          />
          <AnalyticsFeatured />
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    threeMostRecentArticles: state.articlesAll
      .sort((articleA, articleB) => {
        return new Date(articleB.updatedAt) - new Date(articleA.updatedAt);
      })
      .slice(0, 3)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllArticles: () => dispatch(fetchAllArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
