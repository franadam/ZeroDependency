import axios from 'axios';

import { errorUsers } from './';

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
} from './types';

export const getUsers = (users) => ({
  type: FETCH_USERS,
  users,
});

export const createUserSc = (user) => ({
  type: USER_CREATE_PROFILE,
  user,
});

export const readUserSc = (user) => ({
  type: USER_READ_PROFILE,
  user,
});

export const updateUserSc = (user) => ({
  type: USER_UPDATE_PROFILE,
  user,
});

export const deleteUserSc = (userID) => ({
  type: USER_DELETE_PROFILE,
  userID,
});

export const deleteUserPostSc = (postID) => ({
  type: POST_DELETE,
  postID,
});

export const deleteUserTodoSc = (todoID) => ({
  type: TODO_DELETE,
  todoID,
});

export const getPostsSc = (posts) => ({
  type: FETCH_USER_POSTS,
  posts,
});

export const getAlbumsSc = (albums) => ({
  type: FETCH_USER_ALBUMS,
  albums,
});

export const getTodosSc = (todos) => ({
  type: FETCH_USER_TODOS,
  todos,
});

export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch(getUsers(res.data));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const createUserInfo = (user) => async (dispatch) => {
  try {
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users',
      user
    );
    dispatch(createUserSc(res.data));
    console.log('res.data :>> ', res.data);
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const readUserInfo = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userID}`
    );
    dispatch(readUserSc(res.data));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const updateUserInfo = (userID, updates) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `https://jsonplaceholder.typicode.com/users/${userID}`,
      updates
    );
    console.log('res.data :>> ', res.data);
    dispatch(updateUserSc(res.data));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const deleteUserInfo = (userID) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userID}`);
    console.log('userID :>> ', userID);
    dispatch(deleteUserSc(userID));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const fetchUserPosts = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userID}`
    );
    dispatch(getPostsSc(res.data));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const fetchUserTodos = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?userId=${userID}`
    );
    dispatch(getTodosSc(res.data));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const fetchUserAlbums = (userID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/albums?userId=${userID}`
    );
    dispatch(getAlbumsSc(res.data));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const deleteUserTodo = (todoID) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoID}`);
    dispatch(deleteUserTodoSc(todoID));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};
