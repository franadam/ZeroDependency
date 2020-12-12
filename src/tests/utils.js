/* eslint-disable */

import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../store/reducers';

/**
 * Return node with the given data-set atrribute
 * @function findByTestAttr
 * @param {ShalowWrapper} wrapper - Enzyme shallow wrapper
 * @param {string} value - data-test attribute value
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, value) => {
  return wrapper.find(`[data-test='${value}']`);
};

export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  expect(propError).toBeUndefined();
};

export const storeFactory = (initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunk));
};
