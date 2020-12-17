import {
  CLEAR_ERROR,
  ERROR_USERS,
  ERROR_POSTS,
  ERROR_TODOS,
} from '../actions/types';

const initialState = {
  users: null,
  posts: null,
  todo: null,
};

const clearError = () => Object.assign({}, { ...initialState });

const reducer = (state = initialState, { type, error }) => {
  switch (type) {
    case ERROR_USERS:
      return Object.assign({}, { ...state, users: error });
    case ERROR_POSTS:
      return Object.assign({}, { ...state, posts: error });
    case ERROR_TODOS:
      return Object.assign({}, { ...state, likes: error });
    case CLEAR_ERROR:
      return clearError(state);
    default:
      return state;
  }
};

export default reducer;
