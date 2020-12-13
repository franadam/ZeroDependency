import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../../tests/utils';

import EditProfile from './EditProfile';

/**
 * Factory function to create a ShalowWrapper for the EditProfile component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<EditProfile store={store} />);
  return wrapper;
};

describe('render EditProfile component', () => {
  test('should render without error', () => {
    let wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-editProfile');
    expect(component.length).toBe(1);
  });
});
