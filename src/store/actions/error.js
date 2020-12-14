import { CLEAR_ERROR, ERROR_USERS, ERROR_POSTS, ERROR_TODOS } from './types';

export const errorUsers = (error) => ({
  type: ERROR_USERS,
  error,
});

export const errorPosts = (error) => ({
  type: ERROR_POSTS,
  error,
});

export const errorTodos = (error) => ({
  type: ERROR_TODOS,
  error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
