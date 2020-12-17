import { filterObjectById } from '../../utils/stateTransforation';
import {
  FETCH_POSTS,
  POST_CREATE,
  POST_UPDATE,
  POST_DELETE,
} from '../actions/types';

export const initialState = {
  byId: {},
  allIds: [],
};

export const fetchPosts = (state, action) => {
  const posts = action.posts;
  const byId = {};
  const allIds = [];
  posts.forEach((post) => {
    byId[post.id] = post;
    allIds.push(post.id);
  });
  return Object.assign({}, { ...state, byId, allIds });
};

export const createPost = (state, action) => {
  const post = action.post;
  const byId = Object.assign({}, state.byId);
  const allIds = state.allIds.slice();
  allIds.push(post.id);
  byId[action.post.id] = post;
  return Object.assign({}, { ...state, allIds, byId });
};

export const updatePost = (state, action) => {
  const byId = filterObjectById(state.byId, action.post.id);
  const post = action.post;
  byId[action.post.id] = post;
  return Object.assign({}, { ...state, byId });
};

export const deletePost = (state, action) => {
  const allIds = state.allIds.filter((u) => u != action.postID);
  const byId = filterObjectById(state.byId, action.postID);
  return Object.assign({}, { ...state, allIds, byId });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return fetchPosts(state, action);
    case POST_CREATE:
      return createPost(state, action);
    case POST_UPDATE:
      return updatePost(state, action);
    case POST_DELETE:
      return deletePost(state, action);
    default:
      return state;
  }
};

export default reducer;
