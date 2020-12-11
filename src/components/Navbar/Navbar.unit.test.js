import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../tests/utils';

import Navbar from './Navbar';

const defaultProps = {};

/**
 * Factory function to create a ShalowWrapper for the Navbar component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = defaultProps) => {
  return shallow(<Navbar {...props} />);
};

test('should render without error', () => {
  let wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-navbar');
  expect(component.length).toBe(1);
});
