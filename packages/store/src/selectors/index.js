import { createSelector } from 'reselect';
import { getIn, getJoinedModule } from 'utils';

export const getPages = state => state.pagesReducer;

export const getQuery = (state, props) => getIn(['url', 'query'])(props) || {};

export const getHomePage = createSelector([getPages], pages =>
  pages.find(page => page.pageType === 'home'),
);

export const getJoinedHomePage = createSelector(
  [getHomePage, getQuery],
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
