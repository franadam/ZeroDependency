import { combineReducers } from 'redux';
import userReducer from './user';
import errorReducer from './error';
import postReducer from './post';
import todoReducer from './todo';

const RootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  todo: todoReducer,
  error: errorReducer,
});

export default RootReducer;
