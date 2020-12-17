import { filterObjectById } from '../../utils/stateTransforation';
import { FETCH_TODOS, TODO_DELETE } from '../actions/types';

export const initialState = {
  byId: {},
  allIds: [],
};

export const fetchTodos = (state, action) => {
  const todos = action.todos;
  const byId = {};
  const allIds = [];
  todos.forEach((todo) => {
    byId[todo.id] = todo;
    allIds.push(todo.id);
  });
  return Object.assign({}, { ...state, byId, allIds });
};

export const deleteTodo = (state, action) => {
  const allIds = state.allIds.filter((u) => u != action.todoID);
  const byId = filterObjectById(state.byId, action.todoID);
  return Object.assign({}, { ...state, allIds, byId });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return fetchTodos(state, action);
    case TODO_DELETE:
      return deleteTodo(state, action);
    default:
      return state;
  }
};

export default reducer;
