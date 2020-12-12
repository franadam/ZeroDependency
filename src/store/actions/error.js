import { CLEAR_ERROR, ERROR_USERS, ERROR_POSTS, ERROR_ALBUMS } from './types';

export const errorUsers = (error) => ({
  type: ERROR_USERS,
  error,
});

export const errorPosts = (error) => ({
  type: ERROR_POSTS,
  error,
});

export const errorAlbums = (error) => ({
  type: ERROR_ALBUMS,
  error,
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});
