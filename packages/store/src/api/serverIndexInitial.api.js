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
  const {
    req: { cookies },
  } = context;
  const variables = {
    keys: `
      $pageFilter: StorePagesFilterInput,
      $menuSearch: searchInputObjectType,
      $memberGroupFilter: MemberGroupFilterInput,
      $notificationSearch: searchInputObjectType,
      $expireBy: Int!,
      $smartConversionToken: String,
      $activitiesFilter: StoreActivitiesFilterInput,
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
      memberGroupFilter: {
        status: 'ENABLED',
      },
      notificationSearch: {},
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
      smartConversionToken: cookies?.smartConversionToken,
      activitiesFilter: {
        status: 1,
        plugin: 'groupDiscount',
      },
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

        activities(filter: $activitiesFilter) {
          ${activityQuery}
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
