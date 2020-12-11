import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../tests/utils';

import Home from './Home';

const defaultProps = {};

/**
 * Factory function to create a ShalowWrapper for the Home component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = defaultProps) => {
  return shallow(<Home {...props} />);
};

test('should render without error', () => {
  let wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-home');
  expect(component.length).toBe(1);
});
