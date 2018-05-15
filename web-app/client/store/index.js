import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import articlesAll from './articlesAll';
import articleSelected from './articleSelected';
import articleStyle from './articleStyle';
import message from './message';
import navbar from './navbar';
import user from './user';
import online from './online';

const reducer = combineReducers({
  articlesAll,
  articleSelected,
  articleStyle,
  message,
  navbar,
  user,
  online
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './articlesAll';
export * from './articleSelected';
export * from './articleStyle';
export * from './message';
export * from './navbar';
export * from './user';
export * from './online';
