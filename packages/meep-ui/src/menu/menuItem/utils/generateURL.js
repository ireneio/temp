import PropTypes from 'prop-types';
import queryString from 'query-string';

import { NOTLOGIN } from 'constants/isLogin';
import { ID_TYPE, URL_TYPE } from 'constants/propTypes';

/**
 * @param {Object} page - menu -> pages
 * @param {String} isLogin - in Context
 */
export default (page, isLogin) => {
  const { action, params = {} } = page;

  switch (action) {
    case 1: {
      /**
       * TODO: STORYBOOK_ENV
       * This should be checked by propTypes,
       * but it can not be checked with current data structure.
       */
      PropTypes.checkPropTypes(
        {
          path: PropTypes.string,
          pageId: PropTypes.oneOfType([PropTypes.oneOf(['Home']), ID_TYPE]),
        },
        params,
        'action = 1',
        'MenuItem or SubItem',
      );
      /* end */

      const { path, pageId } = params;

      if (pageId === 'Home') {
        return '/';
      }

      if (pageId && path) {
        return `/pages/${path}`;
      }

      if (pageId) {
        return `/page/${pageId}`;
      }
      return null;
    }

    case 2: {
      /**
       * TODO: STORYBOOK_ENV
       * This should be checked by propTypes,
       * but it can not be checked with current data structure.
       */
      PropTypes.checkPropTypes(
        {
          url: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
            ? URL_TYPE.isRequired
            : PropTypes.oneOfType([PropTypes.oneOf(['']), URL_TYPE]).isRequired,
        },
        params,
        'action = 2',
        'MenuItem or SubItem',
      );
      /* end */

      const { url } = params;

      if (url && !/\/\/?/.test(url)) {
        return `//${url}`;
      }

      return url;
    }

    case 3: {
      /**
       * TODO: STORYBOOK_ENV
       * This should be checked by propTypes,
       * but it can not be checked with current data structure.
       */
      PropTypes.checkPropTypes(
        {
          queryString: PropTypes.string,
          from: PropTypes.number.isRequired,
          size: PropTypes.number.isRequired,
          sort: PropTypes.shape({
            order: PropTypes.oneOf(['desc', 'asc']).isRequired,
          }).isRequired,
          price: PropTypes.shape({
            gte: PropTypes.number.isRequired,
            lte: PropTypes.number.isRequired,
          }).isRequired,
          tags: PropTypes.string.isRequired,
        },
        params,
        'action = 3',
        'MenuItem or SubItem',
      );
      /* end */

      const {
        from: offset,
        size: limit,
        query_string: search,
        sort,
        price,
        tags,
      } = params;
      const { order } = sort;

      const query = {
        offset,
        limit,
        sort: `createdOn-${order}`,
      };

      if (search) {
        query.search = search;
      }

      if (price.gte > 10000) {
        const { lte, gte } = price;

        query.sort = `${lte},${gte}`;
      }

      if (tags) query.tags = tags;

      return `/products?${queryString.stringify(query)}`;
    }

    case 8:
      if (isLogin === NOTLOGIN) {
        return '/login';
      }

      return null;

    default:
      return null;
  }
};
