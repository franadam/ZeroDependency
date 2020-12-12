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

export const delUser = (userID) => ({
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

export const deleteUserProfile = (userID) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userID}`);
    console.log('userID :>> ', userID);
    dispatch(delUser(userID));
  } catch (error) {
    dispatch(errorUsers(error));
  }
};
