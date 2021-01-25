import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getJoinedModule } from 'utils';
import {
  getPages,
  getMenus,
  getActivities,
  getLogoUrl,
  getMobileLogoUrl,
  getJoinedPage,
  getQuery,
  getProductListCache,
} from './index';

const getProductsPage = createSelector([getPages], pages =>
  R.findLast(R.propEq('pageType', 'products'))(pages),
);

const getProductsCombinedPage = createSelector(
  [
    getProductsPage,
    getQuery,
    getMenus,
    // getProduct,
    getActivities,
    // getProductListCache
    getProductListCache,
  ],
  (
    page,
    query,
    menus,
    // product,
    activities,
    // productList
    productListCache,
  ) => {
    const blocks = page.blocks.map(({ widgets, ...block }) => ({
      ...block,
      widgets: getJoinedModule(widgets, {
        query,
        menus,
        // product,
        activities,
        // productList
        productListCache,
      }),
    }));
    return { ...page, blocks };
  },
);

export const getJoinedProductsPage = createSelector(
  [getProductsCombinedPage, getMenus, getLogoUrl, getMobileLogoUrl],
  getJoinedPage,
);
