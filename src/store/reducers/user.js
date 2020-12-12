import {
  FETCH_USERS,
  USER_CREATE_PROFILE,
  USER_READ_PROFILE,
  USER_UPDATE_PROFILE,
  USER_DELETE_PROFILE,
} from '../actions/types';

export const initialState = {
  users: [],
};

export const fetchUsers = (state, action) => {
  const users = action.users;
  return Object.assign({}, { ...state, users });
};

export const deleteUserProfile = (state, action) => {
  const users = state.users.filter((u) => u.id != action.userID);
  return Object.assign({}, { ...state, users });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return fetchUsers(state, action);
    case USER_DELETE_PROFILE:
      return deleteUserProfile(state, action);
    default:
      return state;
  }
};

export default reducer;
