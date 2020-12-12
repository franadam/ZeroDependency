import reducer from './user';

import {
  FETCH_USERS,
  USER_CREATE_PROFILE,
  USER_READ_PROFILE,
  USER_UPDATE_PROFILE,
  USER_DELETE_PROFILE,
} from '../actions/types';

describe('user reducer', () => {
  let users = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Britney Spear',
      username: 'Brit',
      email: 'Spearit@april.biz',
    },
  ];

  test('should return initial state when no actions is passed', () => {
    const newState = reducer(undefined, {});
    expect(newState).toEqual({
      users: [],
    });
  });

  test('should update state with an users array when an action of type "FETCH_USERS" is passed', () => {
    const newState = reducer(undefined, {
      type: FETCH_USERS,
      users,
    });
    expect(newState).toEqual({
      users,
    });
  });

  test('should delete an user from the state when an action of type "USER_DELETE_PROFILE" is passed', () => {
    const newState = reducer(
      { users },
      {
        type: USER_DELETE_PROFILE,
        userID: 2,
      }
    );
    expect(newState.users.length).toBe(1);
  });
});
