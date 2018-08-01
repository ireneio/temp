import PropTypes from 'prop-types';

import { RATIOS } from './constants';

/** test 16:9, 4:3, 16:10 */
export const ASPECT_TYPE = PropTypes.oneOf(Object.keys(RATIOS));
