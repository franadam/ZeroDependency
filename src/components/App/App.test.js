import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

test('renders learn react link', () => {
  let wrapper = shallow(<App />);
  const linkElement = wrapper.find(`#app`);
  expect(linkElement.length).toBe(1);
});
