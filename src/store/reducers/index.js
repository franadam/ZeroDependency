import { combineReducers } from 'redux';
import userReducer from './user';
import errorReducer from './error';
//import albumReducer from './album';
//import postReducer from './post';

const RootReducer = combineReducers({
  user: userReducer,
  //post: postReducer,
  //album: albumReducer,
  error: errorReducer,
});

export default RootReducer;
