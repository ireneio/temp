import PropTypes from 'prop-types';

import { COLOR_TYPE, EMAIL_TYPE } from 'constants/propTypes';

export const USER_TYPE = PropTypes.shape({
  name: PropTypes.string,
  email: EMAIL_TYPE.isRequired,
});

export const STORE_SETTING_TYPE = PropTypes.shape({
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
});

export const LOCATION_TYPE = PropTypes.shape({
  host: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
});
