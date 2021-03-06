import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Analytics,
  Article,
  ArticleList,
  Home,
  LandingPage,
  LoginPage,
  PageContainer,
  SignupPage,
  UserHome
} from './components';
import {
  me,
  postCachedInteractions,
  acNetworkConnectionLost,
  acNetworkConnectionRestored
} from './store';
import {
  localInteractionsExist,
  getLocalInteractions
} from './utils/helperFuncs';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData();
    if (localInteractionsExist()) {
      let interactions = getLocalInteractions();
      this.props.transferLocalStorageToDb(interactions);
    }
  }

  componentWillUnmount () {
    clearInterval(this.checkIfOnlineInterval);
  }

  render () {
    const { isLoggedIn } = this.props;

    this.checkIfOnlineInterval = setInterval(
      () => this.props.checkIfOnline(this.props.online),
      1000
    );

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {isLoggedIn ? (
          <Route
            exact
            path="/"
            render={() => (
              <PageContainer>
                <Home />
              </PageContainer>
            )}
          />
        ) : (
          <Route exact path="/" component={LandingPage} />
        )}
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route
              path="/home"
              render={() => (
                <PageContainer>
                  <Home />
                </PageContainer>
              )}
            />
            <Route
              path="/user-home"
              render={() => (
                <PageContainer>
                  <UserHome />
                </PageContainer>
              )}
            />
            <Route
              exact
              path="/articles"
              render={() => (
                <PageContainer>
                  <ArticleList type="my-list" />
                </PageContainer>
              )}
            />
            <Route
              path="/archive"
              render={() => (
                <PageContainer>
                  <ArticleList type="archive" />
                </PageContainer>
              )}
            />
            <Route
              path="/analytics"
              render={() => (
                <PageContainer>
                  <Analytics />
                </PageContainer>
              )}
            />
            <Route
              path="/articles/:id"
              render={() => (
                <Article
                  transferLocalStorageToDb={this.props.transferLocalStorageToDb}
                />
              )}
            />
          </Switch>
        )}
        {/* Displays our Home component as a fallback */}
        <Route component={LandingPage} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    online: state.online
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadInitialData () {
      dispatch(me());
    },
    transferLocalStorageToDb (interactions) {
      if (interactions) dispatch(postCachedInteractions({ interactions }));
    },
    checkIfOnline (onlineStatus) {
      if (navigator.onLine !== onlineStatus) {
        if (!navigator.onLine) {
          dispatch(acNetworkConnectionLost());
        } else {
          dispatch(acNetworkConnectionRestored());
        }
      }
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
