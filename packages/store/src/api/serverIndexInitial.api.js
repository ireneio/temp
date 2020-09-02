import postGraphql from 'utils/postGraphql';
import {
  viewer,
  viewerStoreQuery,
  pageQuery,
  menuQuery,
  activityQuery,
  stockNotificationQuery,
} from './query';

export default async context => {
  const variables = {
    keys: `
      $pageFilter: StorePagesFilterInput,
      $menuSearch: searchInputObjectType,
      $activitySearch: searchInputObjectType,
      $memberGroupFilter: MemberGroupFilterInput,
      $notificationSearch: searchInputObjectType,
      $expireBy: Int!,
    `,
    type: 'query serverIndexInitial',
    values: {
      pageFilter: {
        type: 'HOME',
      },
      menuSearch: {
        size: 50,
        from: 0,
        filter: {
          and: [],
        },
        sort: [
          {
            field: 'createdAt',
            order: 'desc',
          },
        ],
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
      notificationSearch: {},
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
    },
  };

  const query = `
    ${viewer}
    ${viewerStoreQuery}
    viewer {
      store {
        pages(first: 50, filter: $pageFilter) {
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
    getColorList {
      data {
        id
        imgInfo {
          used
          repeat
          size
          files {
            image
          }
        }
      }
      total
    }
    getActivityList(search: $activitySearch) {
      data {
        ${activityQuery}
      }
      total
    }
    getStockNotificationList(search: $notificationSearch) {
      data {
        ${stockNotificationQuery}
      }
    }
  `;

  const response = await postGraphql({
    ...context,
    query,
    variables,
  });
  return response;
};
