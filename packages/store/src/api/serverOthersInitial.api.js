import postGraphql from 'utils/postGraphql';
import {
  viewer,
  viewerStoreQuery,
  storeAppQuery,
  menuQuery,
  colorQuery,
  activityQuery,
  cartQuery,
  pointsQuery,
  orderApplyQuery,
  webTrackQuery,
  stockNotificationQuery,
} from './query';

export default async function(context) {
  const variables = {
    keys:
      '$menuSearch: searchInputObjectType, $colorSearch: searchInputObjectType, $activitySearch: searchInputObjectType, $storeAppSearch: searchInputObjectType, $paymentSearch: searchInputObjectType, $memberGroupFilter: MemberGroupFilterInput, $appLoginSearch: searchInputObjectType, $cartSearch: searchInputObjectType, $notificationSearch: searchInputObjectType, $orderApplySearch: searchInputObjectType, $hasUseablePoints: Boolean!, $expireBy: Int!, $webTrackSearch: searchInputObjectType',
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
      storeAppSearch: {
        size: 100,
        from: 0,
      },
      paymentSearch: {
        filter: {
          and: [
            {
              type: 'exact',
              field: 'status',
              query: '1',
            },
          ],
        },
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
      appLoginSearch: {
        size: 50,
        from: 0,
        filter: {
          and: [
            {
              type: 'exact',
              field: 'plugin',
              query: 'fbLogin',
            },
          ],
        },
        sort: [
          {
            field: 'sort',
            order: 'asc',
          },
        ],
      },
      cartSearch: {
        showDetail: true,
      },
      notificationSearch: {},
      orderApplySearch: {
        size: 100,
        sort: [
          {
            field: 'createdOn',
            order: 'desc',
          },
        ],
      },
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
    getStorePaymentList(search: $paymentSearch) {
      data {
        id
        title {
          zh_TW
          en_US
        }
        template
        accountInfo {
          gmo {
            isInstallment
          }
        }
      }
    }
    getAppLoginList(search: $appLoginSearch) {
      data {
        id
        appId
      }
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
    getOrderApplyList(search: $orderApplySearch) {
      data {
        ${orderApplyQuery}
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
