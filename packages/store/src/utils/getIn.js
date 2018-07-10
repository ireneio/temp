import * as R from 'ramda';

/**
 * Get specific value by cursors from data
 *
 * @param {Array} cursors
 * @param {any} data
 * @returns desired value
 */
const getIn = (cursors, data) => {
  if (!R.is(Array, cursors)) {
    console.error('Params cursors is not an array.');
  }
  return R.view(R.lensPath(cursors), data);
};

export default R.curry(getIn);
