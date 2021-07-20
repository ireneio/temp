import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getJoinedModule } from 'utils';
import {
  getPages,
  getMenus,
  getLogoUrl,
  getMobileLogoUrl,
  getJoinedPage,
  getQuery,
} from './index';

const getProductsPage = createSelector([getPages], pages =>
  R.findLast(R.propEq('pageType', 'products'))(pages),
);

const getProductsCombinedPage = createSelector(
  [getProductsPage, getQuery, getMenus],
  (page, query, menus) => {
    const blocks = page.blocks.map(({ widgets, ...block }) => ({
      ...block,
      widgets: getJoinedModule(widgets, {
        query,
        menus,
      }),
    }));
    return { ...page, blocks };
  },
);

export const getJoinedProductsPage = createSelector(
  [getProductsCombinedPage, getMenus, getLogoUrl, getMobileLogoUrl],
  getJoinedPage,
);
