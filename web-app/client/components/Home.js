// Single Article Page Component (i.e. where article is read from)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllArticles } from '../store';
import { ArticleCardList } from '../components';
import { Container, Header } from 'semantic-ui-react';

class Home extends Component {
  componentDidMount () {
    this.props.getAllArticles();
  }

  render () {
    return (
      <Container>
        <ArticleCardList
          articles={this.props.threeMostRecentArticles}
          className="article-card-list"
        />
        <Container className="featuredAnalytics">
          <Header as="h2">Future home of interesting analytics</Header>
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
