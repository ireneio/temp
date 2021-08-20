import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getJoinedModule } from 'utils';
import { getPages, getQuery } from './index';

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

export const getJoinedPageInPagesRoute = createSelector(
  [getPageByPath, getQuery],
  (page, query) =>
    !page
      ? page
      : {
          ...page,
          blocks: page.blocks.map(({ widgets, ...block }) => ({
            ...block,
            widgets: getJoinedModule(widgets, {
              query,
            }),
          })),
        },
);
