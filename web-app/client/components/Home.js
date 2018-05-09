// Single Article Page Component (i.e. where article is read from)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Container, Header, Segment, Sidebar } from 'semantic-ui-react';
import { ArticleCardList, NavbarSideDesktop, NavbarSideMobile } from '.';
import { fetchAllArticles } from '../store';
import { desktop } from '../utils/constants';

class Home extends Component {
  componentDidMount () {
    this.props.getAllArticles();
  }

  render () {
    return (
      // <div id="home-container">
      <Sidebar.Pushable id="home-container">
        <MediaQuery minWidth={desktop}>
          {matches => (matches ? <NavbarSideDesktop /> : <NavbarSideMobile />)}
        </MediaQuery>
        <Sidebar.Pusher>
          <Container id="home-content">
            <ArticleCardList
              articles={this.props.threeMostRecentArticles}
              className="article-card-list"
            />
            <Container className="featuredAnalytics">
              <Header as="h2">Future home of interesting analytics</Header>
            </Container>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      // </div>
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
