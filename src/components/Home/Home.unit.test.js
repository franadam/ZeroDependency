import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory, checkProps } from '../../tests/utils';

import Home, { UnconnectedHome } from './Home';

/**
 * Factory function to create a ShalowWrapper for the App component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Home store={store} />)
    .dive()
    .dive();
  return wrapper;
};

describe('render', () => {
  test('should render without error', () => {
    let wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-home');
    expect(component.length).toBe(1);
  });
});

describe('redux props', () => {
  test('should have users as props', () => {
    const users = [];
    const wrapper = setup({ user: { users } });
    const usersProp = wrapper.instance().props.users;
    expect(usersProp).toBeInstanceOf(Array);
  });
  test('should have error as props', () => {
    const errors = {};
    const wrapper = setup({ error: { errors } });
    const errorsProp = wrapper.instance().props.errors;
    expect(errorsProp).toBeInstanceOf(Object);
  });
  test('should have "onFetchUsers" action as props', () => {
    const wrapper = setup();
    const onFetchUsersProp = wrapper.instance().props.onFetchUsers;
    expect(onFetchUsersProp).toBeInstanceOf(Function);
  });
});

describe('component props', () => {
  test('should not throw warning with expected props', () => {
    const expectedProps = { error: null };
    checkProps(Home, expectedProps);
  });
});

test('should run "onFetchUsers" action on mount', () => {
  const onFetchUsersMock = jest.fn();
  const wrapper = shallow(<UnconnectedHome onFetchUsers={onFetchUsersMock} />);
  wrapper.instance().componentDidMount();
  const onFetchUsersCallCount = onFetchUsersMock.mock.calls.length;
  expect(onFetchUsersCallCount).toBe(1);
});
