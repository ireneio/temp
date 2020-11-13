import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getJoinedModule } from 'utils';
import {
  getPages,
  getMenus,
  getActivities,
  getWishList,
  getLogoUrl,
  getMobileLogoUrl,
  getJoinedPage,
  getLocaleItemsTemplate,
  getCurrencyItemsTemplate,
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
    getLocaleItemsTemplate,
    getCurrencyItemsTemplate,
    // getProduct,
    getActivities,
    getWishList,
    // getProductListCache
    getProductListCache,
  ],
  (
    page,
    query,
    menus,
    localeItemsTemplate,
    currencyItemsTemplate,
    // product,
    activities,
    wishList,
    // productList
    productListCache,
  ) => {
    const blocks = page.blocks.map(({ widgets, ...block }) => ({
      ...block,
      widgets: getJoinedModule(widgets, {
        query,
        menus,
        localeItemsTemplate,
        currencyItemsTemplate,
        // product,
        activities,
        wishList,
        // productList
        productListCache,
      }),
    }));
    return { ...page, blocks };
  },
);

export const getJoinedProductsPage = createSelector(
  [
    getProductsCombinedPage,
    getMenus,
    getLogoUrl,
    getMobileLogoUrl,
    getLocaleItemsTemplate,
    getCurrencyItemsTemplate,
  ],
  (
    productsPage,
    menus,
    logoUrl,
    mobileLogoUrl,
    localeItemsTemplate,
    currencyItemsTemplate,
  ) =>
    getJoinedPage(
      productsPage,
      menus,
      logoUrl,
      mobileLogoUrl,
      localeItemsTemplate,
      currencyItemsTemplate,
    ),
);
