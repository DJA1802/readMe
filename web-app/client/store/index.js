import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import articlesAll from './articlesAll';
import articleSelected from './articleSelected';
import interactions from './interactions';
import articleStyle from './articleStyle';
import message from './message';
import navbar from './navbar';
import pageScroll from './pageScroll';
import user from './user';
import online from './online';
import analytics from './analytics';

const reducer = combineReducers({
  articlesAll,
  articleSelected,
  interactions,
  articleStyle,
  message,
  navbar,
  pageScroll,
  user,
  online,
  analytics,
  form: formReducer
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './articlesAll';
export * from './articleSelected';
export * from './interactions';
export * from './articleStyle';
export * from './message';
export * from './navbar';
export * from './pageScroll';
export * from './user';
export * from './online';
export * from './analytics';
