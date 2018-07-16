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
} from './index';

const getProductList = state => state.productsReducer;
const getProductId = (_, props) => props.pId;

export const getProduct = createSelector(
  [getProductList, getProductId],
  (productList, pId) => R.find(R.propEq('id', pId))(productList),
);

export const getProductDescription = createSelector(
  [getProduct],
  ({ description }) => {
    const descTw = getIn(['zh_TW'])(description) || '';
    if (descTw === '') {
      return '';
    } else if (descTw.match(/entityMap/gm)) {
      // DraftJS type
      const productDescriptionObj =
        descTw && JSON.parse(getIn(['zh_TW'])(description));
      return productDescriptionObj.blocks.reduce(
        (_description, block) => `${_description} ${block.text}`,
        '',
      );
    }
    return '';
  },
);

const getPageIdByProduct = createSelector(
  getProduct,
  product =>
    getIn(['design', 'templateId'])(product) ||
    getIn(['design', 'pageId'])(product),
);

const getPageById = createSelector(
  [getPageIdByProduct, getPages],
  (id, pages) => {
    if (!id) return R.find(R.propEq('pageType', 'template'))(pages);
    return R.find(R.propEq('id', id))(pages);
  },
);

const getProductCombinedPage = createSelector(
  [
    getPageById,
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
