import postGraphql from 'utils/postGraphql';
import {
  viewer,
  viewerStoreQuery,
  menuQuery,
  activityQuery,
  stockNotificationQuery,
} from './query';

export default async context => {
  const variables = {
    keys: `
      $menuSearch: searchInputObjectType,
      $notificationSearch: searchInputObjectType,
      $expireBy: Int!,
      $activitiesFilter: StoreActivitiesFilterInput,
    `,
    type: 'query serverOthersInitial',
    values: {
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
      notificationSearch: {},
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
      activitiesFilter: {
        status: 1,
        plugin: 'groupDiscount',
      },
    },
  };

  const query = `
    ${viewer}
    ${viewerStoreQuery}
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
    viewer {
      store {
        activities(filter: $activitiesFilter) {
          ${activityQuery}
        }
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
