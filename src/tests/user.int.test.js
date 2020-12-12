import moxios from 'moxios';

import { storeFactory } from './utils';
import { fetchUsers, deleteUserProfile } from '../store/actions';

describe('users action dispatcher ', () => {
  let store;
  const initialState = { user: { users: [] } };
  const users = [
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

  beforeEach(() => {
    moxios.install();
    store = storeFactory(initialState);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('should correctly update user.users state for succesfull "fetchUsers" action ', () => {
    const expectedResponse = users;
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse,
      });
    });

    //console.log('expectedResponse :>> ', expectedResponse);

    return store.dispatch(fetchUsers()).then(() => {
      const newState = store.getState();
      const expectedState = {
        user: { users },
        error: {
          users: null,
          posts: null,
          albums: null,
        },
      };
      expect(newState).toEqual(expectedState);
    });
  });
  /**
  test('should delete an user when "deleteUserProfile" is called', () => {
    const userID = 2;
    const expectedResponse = users.filter((u) => u.id != userID);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedResponse,
      });
    });

    return store.dispatch(deleteUserProfile(userID)).then(() => {
      const newState = store.getState();
      const expectedState = {
        user: { users: expectedResponse },
        error: {
          users: null,
          posts: null,
          albums: null,
        },
      };
      expect(newState).toEqual(expectedState);
    });
  });
**/
});
