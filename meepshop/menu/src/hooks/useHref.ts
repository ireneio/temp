// import
import { useMemo } from 'react';

import { ACION_TYPES } from '../constants';

// graphql typescript
import {
  useHrefUserFragment as useHrefUserFragmentType,
  useHrefMenuPageObjectTypeFragment as useHrefMenuPageObjectTypeFragmentType,
} from '@meepshop/types/gqls/meepshop';

// definition
export default (
  user: useHrefUserFragmentType | null,
  page: useHrefMenuPageObjectTypeFragmentType,
): string | null =>
  useMemo(() => {
    const { action, params } = page;

    switch (ACION_TYPES[action || 0]) {
      case 'PAGE_URL': {
        const { pageId, path } = params || {};

        if (pageId === 'Home') return '/';

        if (pageId && path) return `/pages/${path}`;

        if (pageId) return `/page/${pageId}`;

        return null;
      }

      case 'CUSTOM_URL':
        return params?.url || null;

      case 'PRODUCTS_URL': {
        const { offset, limit, search, sort, price, tags } = params || {};
        const query = {
          offset,
          limit,
          sort: `createdAt-${sort?.order}`,
          price: `${price?.lte},${price?.gte}`,
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

        return `/products?${Object.keys(query)
          .map((key: keyof typeof query) => `${key}=${query[key]}`)
          .join('&')}`;
      }

      case 'MEMBER':
        return user?.role !== 'SHOPPER' ? '/login' : null;

      default:
        return null;
    }
  }, [user, page]);
