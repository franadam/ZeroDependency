import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../tests/utils';

import App from './App';

/**
 * Factory function to create a ShalowWrapper for the App component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}) => {
  return shallow(<App {...initialState} />);
};

test('renders learn react link', () => {
  let wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});
