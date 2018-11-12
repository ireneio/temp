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

    case 2: {
      const { url } = params;

      /*
       * TODO: remove use new Link
       * https://github.com/meepshop/meep-lerna/pull/111/
       */
      return url && !/\/\/?/.test(url) ? `//${url}` : url;
    }

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
        sort: `createdOn-${order}`,
      };

      if (search) query.search = search;

      if (gte > 10000) query.sort = `${lte},${gte}`;

      if (tags) query.tags = tags;

      return `/products?${queryString.stringify(query)}`;
    }

    case 8:
      return isLogin === NOTLOGIN ? '/login' : null;

    default:
      return null;
  }
};
