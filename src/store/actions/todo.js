import axios from 'axios';

import { errorTodos } from './';

import { FETCH_TODOS, TODO_DELETE } from './types';

export const getTodos = (todos) => ({
  type: FETCH_TODOS,
  todos,
});

export const deleteTodoSc = (todoID) => ({
  type: TODO_DELETE,
  todoID,
});

export const fetchTodos = () => async (dispatch) => {
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
    dispatch(getTodos(res.data));
  } catch (error) {
    dispatch(errorTodos(error));
  }
};

export const deleteTodo = (todoID) => async (dispatch) => {
  try {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoID}`);
    dispatch(deleteTodoSc(todoID));
  } catch (error) {
    dispatch(errorTodos(error));
  }
};
