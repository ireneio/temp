import PropTypes from 'prop-types';

import { URL_TYPE, HASH_TYPE } from 'constants/propTypes';

import getContextFunc from './utils/getContextFunc';

export const goTo = getContextFunc(
  'go to',
  PropTypes.shape({
    pathname: URL_TYPE.isRequired,
    params: PropTypes.shape({
      search: PropTypes.shape({}),
      hash: HASH_TYPE,
    }),
  }),
);
