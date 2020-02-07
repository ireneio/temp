import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getIn, getJoinedModule } from 'utils';
import {
  getPages,
  getMenus,
  getLogoUrl,
  getCart,
  getActivities,
  getStoreAppList,
  getStockNotificationList,
  getWishList,
  getMobileLogoUrl,
  getJoinedPage,
  getLocaleItemsTemplate,
  getCurrencyItemsTemplate,
  getQuery,
  getProductListCache,
} from './index';

const getProductList = ({ productsReducer }) => productsReducer;
const getProductId = (_, { pId }) => pId;
const getPageId = (_, { pageId }) => pageId;

export const getProduct = createSelector(
  [getProductList, getProductId],
  (productList, pId) => R.find(R.propEq('id', pId))(productList),
);

export const getProductDescription = createSelector(
  [getProduct],
  ({ description }) => {
    const descTw = getIn(['zh_TW'])(description) || '';

    try {
      // DraftJS type
      if (descTw.match(/entityMap/gm))
        return JSON.parse(descTw).blocks.reduce(
          (result, { text }) => `${result} ${text}`,
          '',
        );

      return descTw;
    } catch (error) {
      return '';
    }
  },
);

const getPageByProduct = createSelector(getProduct, product => product.page);

const getPage = createSelector(
  [getPageByProduct, getPageId, getPages],
  (pageByProduct, pageId, pages) =>
    pageId ? R.find(R.propEq('id', pageId))(pages) : pageByProduct,
);

const getProductCombinedPage = createSelector(
  [
    getPage,
    getQuery,
    getMenus,
    getLocaleItemsTemplate,
    getCurrencyItemsTemplate,
    getProduct,
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
    query = {},
    menus,
    localeItemsTemplate,
    currencyItemsTemplate,
    product,
    cart,
    activities,
    storeApps,
    stockNotificationList,
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
        product,
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
  },
);

export const getJoinedPageInProductRoute = createSelector(
  [
    getProductCombinedPage,
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
    const newPages = getJoinedPage(
      page,
      menus,
      logoUrl,
      mobileLogoUrl,
      localeItemsTemplate,
      currencyItemsTemplate,
    );
    return newPages;
  },
);
