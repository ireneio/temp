import PropTypes from 'prop-types';

import { COLOR_TYPE } from 'constants/propTypes';

export const LOCATION_TYPE = PropTypes.shape({
  host: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
});

export const STORE_SETTING_TYPE_OBJ = {
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
};

export const STORE_SETTING_TYPE = PropTypes.shape(STORE_SETTING_TYPE_OBJ);
