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
