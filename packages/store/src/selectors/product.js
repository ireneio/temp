import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getIn, getJoinedModule } from 'utils';
import { getPages, getMenus, getJoinedPage, getQuery } from './index';

const getProductList = ({ productsReducer }) => productsReducer;
const getProductId = (_, { pId }) => pId;
const getPageId = (_, { pageId }) => pageId;

export const getProduct = createSelector(
  [getProductList, getProductId],
  (productList, pId) => R.find(R.propEq('id', pId))(productList) || {},
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

const getPageByProduct = createSelector(
  getProduct,
  product => product.page || {},
);

const getPage = createSelector(
  [getPageByProduct, getPageId, getPages],
  (pageByProduct, pageId, pages) =>
    pageId ? R.find(R.propEq('id', pageId))(pages) : pageByProduct,
);

const getProductCombinedPage = createSelector(
  [getPage, getQuery, getMenus, getProduct],
  (page, query = {}, menus, product) => {
    const blocks = (page.blocks || []).map(({ widgets, ...block }) => ({
      ...block,
      widgets: getJoinedModule(widgets, {
        query,
        menus,
        product,
      }),
    }));
    return { ...page, blocks };
  },
);

export const getJoinedPageInProductRoute = createSelector(
  [getProductCombinedPage, getMenus],
  getJoinedPage,
);
