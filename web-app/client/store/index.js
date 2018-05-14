import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import articlesAll from './articlesAll';
import articleSelected from './articleSelected';
import articleStyle from './articleStyle';
import navbar from './navbar';
import user from './user';

const reducer = combineReducers({
  articlesAll,
  articleSelected,
  articleStyle,
  navbar,
  user
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './articlesAll';
export * from './articleSelected';
export * from './articleStyle';
export * from './navbar';
export * from './user';
