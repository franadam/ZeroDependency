import axios from 'axios';

import { errorPosts } from './';

import {
  FETCH_POSTS,
  POST_CREATE,
  POST_READ,
  POST_UPDATE,
  POST_DELETE,
} from './types';

export const getPosts = (posts) => ({
  type: FETCH_POSTS,
  posts,
});

export const createPostSc = (post) => ({
  type: POST_CREATE,
  post,
});

export const readPostSc = (post) => ({
  type: POST_READ,
  post,
});

export const updatePostSc = (post) => ({
  type: POST_UPDATE,
  post,
});

export const deletePostSc = (postID) => ({
  type: POST_DELETE,
  postID,
});

export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch(getPosts(res.data));
  } catch (error) {
    dispatch(errorPosts(error));
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      post
    );
    dispatch(createPostSc({ ...res.data, id: post.id }));
  } catch (error) {
    dispatch(errorPosts(error));
  }
};

export const readPost = (postID) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postID}`
    );
    dispatch(readPostSc(res.data));
  } catch (error) {
    dispatch(errorPosts(error));
  }
};

export const updatePost = (postID, updates) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${postID}`,
      updates
    );
    dispatch(updatePostSc(res.data));
  } catch (error) {
    dispatch(errorPosts(error));
  }
};

export const deletePost = (postID) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postID}`);
    dispatch(deletePostSc(postID));
  } catch (error) {
    dispatch(errorPosts(error));
  }
};
