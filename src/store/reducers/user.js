import { filterObjectById } from '../../utils/stateTransforation';
import {
  FETCH_USERS,
  USER_CREATE_PROFILE,
  USER_UPDATE_PROFILE,
  USER_READ_PROFILE,
  USER_DELETE_PROFILE,
} from '../actions/types';

export const initialState = {
  byId: {},
  allIds: [],
};

export const fetchUsers = (state, action) => {
  const users = action.users;
  const byId = {};
  const allIds = [];
  users.forEach((user) => {
    byId[user.id] = user;
    allIds.push(user.id);
  });
  return Object.assign({}, { ...state, byId, allIds });
};

export const createUserInfo = (state, action) => {
  const user = action.user;
  const byId = Object.assign({}, state.byId);
  const allIds = state.allIds.slice();
  allIds.push(user.id);
  byId[action.user.id] = user;
  return Object.assign({}, { ...state, allIds, byId });
};

export const updateUserInfo = (state, action) => {
  const byId = filterObjectById(state.byId, action.user.id);
  const user = action.user;
  byId[action.user.id] = user;
  return Object.assign({}, { ...state, byId });
};

export const deleteUserInfo = (state, action) => {
  const allIds = state.allIds.filter((u) => u != action.userID);
  const byId = filterObjectById(state.byId, action.userID);
  return Object.assign({}, { ...state, allIds, byId });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return fetchUsers(state, action);
    case USER_CREATE_PROFILE:
      return createUserInfo(state, action);
    case USER_READ_PROFILE:
      return updateUserInfo(state, action);
    case USER_UPDATE_PROFILE:
      return updateUserInfo(state, action);
    case USER_DELETE_PROFILE:
      return deleteUserInfo(state, action);
    default:
      return state;
  }
};

export default reducer;
