import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getJoinedModule } from 'utils';
import {
  getPages,
  getMenus,
  getLogoUrl,
  getMobileLogoUrl,
  getJoinedPage,
  getActivities,
  getQuery,
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
    // getProduct,
    getActivities,
  ],
  (
    page,
    query,
    menus,
    // product,
    activities,
  ) => {
    if (page) {
      const blocks = page.blocks.map(({ widgets, ...block }) => ({
        ...block,
        widgets: getJoinedModule(widgets, {
          query,
          menus,
          // product,
          activities,
        }),
      }));
      return { ...page, blocks };
    }
    return page;
  },
);

export const getJoinedPageInPagesRoute = createSelector(
  [getJoinedModulePage, getMenus, getLogoUrl, getMobileLogoUrl],
  getJoinedPage,
);
