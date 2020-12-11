import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../tests/utils';

import Layout from './Layout';

const defaultProps = {};

/**
 * Factory function to create a ShalowWrapper for the Layout component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = defaultProps) => {
  return shallow(<Layout {...props} />);
};

test('should render without error', () => {
  let wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-layout');
  expect(component.length).toBe(1);
});
