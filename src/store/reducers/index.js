import { combineReducers } from 'redux';
import userReducer from './user';
import errorReducer from './error';
import postReducer from './post';
//import albumReducer from './album';

const RootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  //album: albumReducer,
  error: errorReducer,
});

export default RootReducer;
