import { FETCH_TODOS } from '../actions/types';

export const initialState = {
  todos: [],
};

export const fetchTodos = (state, action) => {
  const todos = action.todos;
  return Object.assign({}, { ...state, todos });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return fetchTodos(state, action);
    default:
      return state;
  }
};

export default reducer;
