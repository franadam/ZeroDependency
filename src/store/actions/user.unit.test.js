import { getUsers, fetchUsers } from './user';
import {
  FETCH_USERS,
  FETCH_USER_BY_NAME,
  USER_UPDATE_PROFILE,
  USER_DELETE_PROFILE,
} from './types';

describe('user action', () => {
  test('should return an action with type "FETCH_USERS"', () => {
    const action = getUsers();
    expect(action).toEqual({
      type: FETCH_USERS,
      users: undefined,
    });
  });
});
