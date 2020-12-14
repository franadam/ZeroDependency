import {
  FETCH_USERS,
  FETCH_USER_POSTS,
  FETCH_USER_ALBUMS,
  FETCH_USER_TODOS,
  USER_CREATE_PROFILE,
  USER_READ_PROFILE,
  USER_UPDATE_PROFILE,
  USER_DELETE_PROFILE,
  POST_DELETE,
  TODO_DELETE,
} from '../actions/types';

import { deletePost } from './post';

export const initialState = {
  users: [],
  user: {},
};

export const fetchUsers = (state, action) => {
  const users = action.users;
  return Object.assign({}, { ...state, users });
};

export const createUserInfo = (state, action) => {
  const user = action.user;
  const users = state.users.slice();
  users.push(user);
  return Object.assign({}, { ...state, users, user });
};

export const readUserInfo = (state, action) => {
  const user = action.user;
  return Object.assign({}, { ...state, id: user.id, user });
};

export const updateUserInfo = (state, action) => {
  const users = state.users.filter((u) => u.id != action.user.id);
  const user = action.user;
  users.push(user);
  return Object.assign({}, { ...state, users });
};

export const deleteUserInfo = (state, action) => {
  const users = state.users.filter((u) => u.id != action.userID);
  return Object.assign({}, { ...state, users });
};

export const fetchUserPosts = (state, action) => {
  const posts = action.posts;
  return Object.assign({}, { ...state, posts });
};

export const fetchUserAlbums = (state, action) => {
  const albums = action.albums;
  return Object.assign({}, { ...state, albums });
};

export const fetchUserTodos = (state, action) => {
  const todos = action.todos;
  return Object.assign({}, { ...state, todos });
};

export const deleteTodo = (state, action) => {
  const todos = state.todos.filter((u) => u.id != action.todoID);
  return Object.assign({}, { ...state, todos });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return fetchUsers(state, action);
    case FETCH_USER_POSTS:
      return fetchUserPosts(state, action);
    case FETCH_USER_ALBUMS:
      return fetchUserAlbums(state, action);
    case FETCH_USER_TODOS:
      return fetchUserTodos(state, action);
    case USER_CREATE_PROFILE:
      return createUserInfo(state, action);
    case USER_READ_PROFILE:
      return readUserInfo(state, action);
    case USER_UPDATE_PROFILE:
      return updateUserInfo(state, action);
    case USER_DELETE_PROFILE:
      return deleteUserInfo(state, action);
    case POST_DELETE:
      return deletePost(state, action);
    case TODO_DELETE:
      return deleteTodo(state, action);
    default:
      return state;
  }
};

export default reducer;
