import {
  FETCH_POSTS,
  POST_CREATE,
  POST_READ,
  POST_UPDATE,
  POST_DELETE,
} from '../actions/types';

export const initialState = {
  posts: [],
  post: {},
};

export const fetchPosts = (state, action) => {
  const posts = action.posts;
  return Object.assign({}, { ...state, posts });
};

export const createPost = (state, action) => {
  const post = action.post;
  const posts = state.posts.splice();
  posts.push(post);
  return Object.assign({}, { ...state, posts });
};

export const readPost = (state, action) => {
  const post = action.post;
  return Object.assign({}, { ...state, id: post.id, post });
};

export const updatePost = (state, action) => {
  const posts = state.posts.filter((u) => u.id != action.postID);
  const post = action.post;
  posts.push(post);
  return Object.assign({}, { ...state, posts });
};

export const deletePost = (state, action) => {
  const posts = state.posts.filter((u) => u.id != action.postID);
  return Object.assign({}, { ...state, posts });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return fetchPosts(state, action);
    case POST_CREATE:
      return createPost(state, action);
    case POST_READ:
      return readPost(state, action);
    case POST_UPDATE:
      return updatePost(state, action);
    case POST_DELETE:
      return deletePost(state, action);
    default:
      return state;
  }
};

export default reducer;
