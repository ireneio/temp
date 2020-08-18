import queryString from 'query-string';

import { NOTLOGIN } from 'constants/isLogin';

export default (action, params, isLogin) => {
  switch (action) {
    case 1: {
      const { path, pageId } = params;

      if (pageId === 'Home') return '/';

      if (pageId && path) return `/pages/${path}`;

      if (pageId) return `/page/${pageId}`;

      return null;
    }

    case 2:
      return params.url;

    case 3: {
      const {
        from: offset,
        size: limit,
        query_string: search,
        sort: { order },
        price: { lte, gte },
        tags,
      } = params;

      const query = {
        offset,
        limit,
        sort: `createdAt-${order}`,
        price: `${lte},${gte}`,
        ...(search
          ? {
              search,
            }
          : {}),
        ...(tags
          ? {
              tags,
            }
          : {}),
      };

      return `/products?${queryString.stringify(query)}`;
    }

    case 8:
      return isLogin === NOTLOGIN ? '/login' : null;

    default:
      return null;
  }
};
