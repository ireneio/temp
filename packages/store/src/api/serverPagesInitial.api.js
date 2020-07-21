import postGraphql from 'utils/postGraphql';
import {
  viewer,
  viewerStoreQuery,
  pageQuery,
  storeAppQuery,
  menuQuery,
  colorQuery,
  activityQuery,
  cartQuery,
  pointsQuery,
  webTrackQuery,
  stockNotificationQuery,
} from './query';

export default async function(context) {
  const {
    query: { path },
  } = context;
  if (!path) throw new Error('Page path is not defined.');
  const variables = {
    keys: `
      $pageFilter: StorePagesFilterInput,
      $menuSearch: searchInputObjectType,
      $colorSearch: searchInputObjectType,
      $activitySearch: searchInputObjectType,
      $storeAppSearch: searchInputObjectType,
      $memberGroupFilter: MemberGroupFilterInput,
      $cartSearch: searchInputObjectType,
      $notificationSearch: searchInputObjectType,
      $hasUseablePoints: Boolean!,
      $expireBy: Int!,
      $webTrackSearch: searchInputObjectType
    `,
    type: 'query serverPagesInitial',
    values: {
      pageFilter: {
        type: 'CUSTOM',
        path,
      },
      menuSearch: {
        size: 50,
        from: 0,
        filter: {
          and: [],
        },
        sort: [
          {
            field: 'createdOn',
            order: 'desc',
          },
        ],
      },
      storeAppSearch: {
        size: 100,
        from: 0,
      },
      colorSearch: {
        filter: {
          and: [],
        },
      },
      activitySearch: {
        size: 50,
        from: 0,
        filter: {
          and: [
            {
              type: 'exact',
              field: 'status',
              query: '1',
            },
          ],
          not: [
            {
              type: 'exact',
              field: 'plugin',
              query: 'usePoints',
            },
            {
              type: 'exact',
              field: 'plugin',
              query: 'sendPoints',
            },
          ],
        },
      },
      memberGroupFilter: {
        status: 'ENABLED',
      },
      cartSearch: {
        showDetail: true,
      },
      notificationSearch: {},
      hasUseablePoints: true,
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
      webTrackSearch: {
        filter: {
          or: [
            {
              type: 'exact',
              field: 'trackType',
              query: 'google_webmaster',
            },
            {
              type: 'exact',
              field: 'trackType',
              query: 'google_tag_manager',
            },
          ],
        },
      },
    },
  };

  const query = `
    ${viewer}
    ${viewerStoreQuery}
    viewer {
      store {
        pages(first: 1, filter: $pageFilter) {
          edges {
            node {
              ${pageQuery}
            }
          }
          total
        }
      }
    }
    getMenuList(search: $menuSearch) {
      data {
        ${menuQuery}
      }
      total
    }
    getColorList(search: $colorSearch) {
      data {
        ${colorQuery}
      }
      total
    }
    getActivityList(search: $activitySearch) {
      data {
        ${activityQuery}
      }
      total
    }
    getStoreAppList(search: $storeAppSearch) {
      data {
        ${storeAppQuery}
      }
      total
    }
    getCartList(search: $cartSearch) {
      data {
        ${cartQuery}
      }
    }
    getStockNotificationList(search: $notificationSearch) {
      data {
        ${stockNotificationQuery}
      }
    }
    getValidUserPointList(hasUseablePoints: $hasUseablePoints) {
      data {
        ${pointsQuery}
      }
      total
    }
    getFbPixel {
      pixelId
    }
    getGtagList {
      type
      eventName
      code
    }
    getWebTrackList(search: $webTrackSearch) {
      data {
        ${webTrackQuery}
      }
    }
  `;

  const response = await postGraphql({
    ...context,
    query,
    variables,
  });
  return response;
}
