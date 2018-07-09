import PropTypes from 'prop-types';

import {
  ID_TYPE,
  URL_TYPE,
  POSITIVE_NUMBER_TYPE,
  COLOR_TYPE,
} from 'constants/propTypes';

/**
 * TODO: STORYBOOK_DOCS
 * It should be separated by action.
 */
export const PARAMS_TYPE = PropTypes.shape({
  path: PropTypes.string,
  pageId: PropTypes.oneOfType([PropTypes.oneOf(['Home']), ID_TYPE]),
  url: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
    ? URL_TYPE
    : PropTypes.oneOfType([PropTypes.oneOf(['']), URL_TYPE]),
  query_string: PropTypes.string,
  sort: PropTypes.shape({
    order: PropTypes.oneOf(['desc', 'asc']).isRequired,
  }),
  price: PropTypes.shape({
    gte: POSITIVE_NUMBER_TYPE.isRequired,
    lte: POSITIVE_NUMBER_TYPE.isRequired,
  }),
  from: PropTypes.number,
  size: PropTypes.number,
});

export const STATE_STYLE_TYPE = PropTypes.shape({
  color: COLOR_TYPE,
  background: COLOR_TYPE,
  borderColor: COLOR_TYPE,
});
