import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getJoinedModule } from 'utils';
import { getPages, getQuery } from './index';

const getProductList = ({ productsReducer }) => productsReducer;
const getProductId = (_, { pId }) => pId;
const getPageId = (_, { pageId }) => pageId;

export const getProduct = createSelector(
  [getProductList, getProductId],
  (productList, pId) => R.find(R.propEq('id', pId))(productList) || {},
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

export const getJoinedPageInProductRoute = createSelector(
  [getPage, getQuery, getProduct],
  (page, query = {}, product) =>
    !page
      ? page
      : {
          ...page,
          blocks: page.blocks.map(({ widgets, ...block }) => ({
            ...block,
            widgets: getJoinedModule(widgets, {
              query,
              product,
            }),
          })),
        },
);
