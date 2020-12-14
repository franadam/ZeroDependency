import axios from 'axios';

import { errorTodos } from './';

import { FETCH_TODOS } from './types';

export const getTodos = (todos) => ({
  type: FETCH_TODOS,
  todos,
});

export const fetchTodos = () => async (dispatch) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
    dispatch(getTodos(res.data));
  } catch (error) {
    dispatch(errorTodos(error));
  }
};
