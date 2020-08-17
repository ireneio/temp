import postGraphql from 'utils/postGraphql';
import {
  viewer,
  viewerStoreQuery,
  menuQuery,
  activityQuery,
  webTrackQuery,
  stockNotificationQuery,
} from './query';

export default async context => {
  const variables = {
    keys: `
      $menuSearch: searchInputObjectType,
      $activitySearch: searchInputObjectType,
      $memberGroupFilter: MemberGroupFilterInput,
      $notificationSearch: searchInputObjectType,
      $expireBy: Int!,
      $webTrackSearch: searchInputObjectType
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
            field: 'createdOn',
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
};
