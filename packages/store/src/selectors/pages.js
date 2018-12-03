import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getJoinedModule } from 'utils';
import {
  getPages,
  getMenus,
  getLogoUrl,
  getMobileLogoUrl,
  getJoinedPage,
  getLocaleItemsTemplate,
  getCurrencyItemsTemplate,
  getActivities,
  getQuery,
  getCart,
  getStoreAppList,
  getStockNotificationList,
  getWishList,
  getProductListCache,
} from './index';

const getPagePath = (state, { path }) => path;

export const getPageByPath = createSelector(
  [getPagePath, getPages],
  (path, pages) => {
    const page = R.find(R.propEq('path', path))(pages);
    return page || null;
  },
);

export const getJoinedModulePage = createSelector(
  [
    getPageByPath,
    getQuery,
    getMenus,
    getLocaleItemsTemplate,
    getCurrencyItemsTemplate,
    // getProduct,
    getCart,
    getActivities,
    getStoreAppList,
    getStockNotificationList,
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
    cart,
    activities,
    storeApps,
    stockNotificationList,
    wishList,
    // productList
    productListCache,
  ) => {
    if (page) {
      const blocks = page.blocks.map(({ widgets, ...block }) => ({
        ...block,
        widgets: getJoinedModule(widgets, {
          query,
          menus,
          localeItemsTemplate,
          currencyItemsTemplate,
          // product,
          cart,
          activities,
          storeApps,
          stockNotificationList,
          wishList,
          // productList
          productListCache,
        }),
      }));
      return { ...page, blocks };
    }
    return page;
  },
);

export const getJoinedPageInPagesRoute = createSelector(
  [
    getJoinedModulePage,
    getMenus,
    getLogoUrl,
    getMobileLogoUrl,
    getLocaleItemsTemplate,
    getCurrencyItemsTemplate,
  ],
  (
    page,
    menus,
    logoUrl,
    mobileLogoUrl,
    localeItemsTemplate,
    currencyItemsTemplate,
  ) => {
    if (page) {
      return getJoinedPage(
        page,
        menus,
        logoUrl,
        mobileLogoUrl,
        localeItemsTemplate,
        currencyItemsTemplate,
      );
    }
    return page;
  },
);
