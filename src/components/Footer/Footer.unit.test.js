import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../../tests/utils';

import Footer from './Footer';

const defaultProps = {};

/**
 * Factory function to create a ShalowWrapper for the Footer component.
 * @function setup
 * @param {object} props - component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = defaultProps) => {
  return shallow(<Footer {...props} />);
};

test('should render without error', () => {
  let wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-footer');
  expect(component.length).toBe(1);
});
