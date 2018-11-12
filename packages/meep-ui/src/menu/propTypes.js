import PropTypes from 'prop-types';

/** test
 * 12,
 * 14,
 * 16,
 * 18,
 * 20,
 * 22,
 * 24,
 * 26,
 * 28,
 * 30
 */
export const FONTSIZE_TYPE = PropTypes.oneOf(
  [].constructor.apply({}, new Array(19)).map((_, index) => 12 + index),
);
