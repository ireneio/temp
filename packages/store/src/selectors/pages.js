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
  getWishList,
  getProductListCache,
} from './index';

const getPagePath = (state, { path }) => path;
const getPageId = (state, { pageId }) => pageId;

export const getPageByPath = createSelector(
  [getPagePath, getPageId, getPages],
  (path, pageId, pages) => {
    const page = pageId
      ? R.find(R.propEq('id', pageId))(pages)
      : R.find(R.propEq('path', path))(pages);

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
    if (page) {
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
