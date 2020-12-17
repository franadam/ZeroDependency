import axios from 'axios';

import { errorUsers } from './';

import {
  FETCH_USERS,
  USER_CREATE_PROFILE,
  USER_READ_PROFILE,
  USER_UPDATE_PROFILE,
  USER_DELETE_PROFILE,
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
    dispatch(updateUserSc(res.data));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};

export const deleteUserInfo = (userID) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userID}`);
    dispatch(deleteUserSc(userID));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};
