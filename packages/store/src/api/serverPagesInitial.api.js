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
  orderQuery,
  pointsQuery,
  orderApplyQuery,
  webTrackQuery,
  stockNotificationQuery,
} from './query';

export default async function(context) {
  const {
    query: { path },
  } = context;
  if (!path) throw new Error('Page path is not defined.');
  const variables = {
    keys:
      '$pageSearch: searchInputObjectType, $menuSearch: searchInputObjectType, $colorSearch: searchInputObjectType, $activitySearch: searchInputObjectType, $storeAppSearch: searchInputObjectType, $paymentSearch: searchInputObjectType, $memberGroupSearch: searchInputObjectType, $appLoginSearch: searchInputObjectType, $cartSearch: searchInputObjectType, $notificationSearch: searchInputObjectType, $orderSearch: searchInputObjectType, $orderApplySearch: searchInputObjectType, $hasUseablePoints: Boolean!, $expireBy: Int!, $webTrackSearch: searchInputObjectType',
    type: 'query serverPagesInitial',
    values: {
      pageSearch: {
        size: 50,
        from: 0,
        sort: [
          {
            field: 'createdOn',
            order: 'asc',
          },
        ],
        filter: {
          and: [
            {
              type: 'exact',
              field: 'path',
              query: path,
            },
          ],
          or: [
            {
              type: 'exact',
              field: 'pageType',
              query: 'custom',
            },
            {
              type: 'exact',
              field: 'pageType',
              query: 'products',
            },
          ],
        },
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
      memberGroupSearch: {
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
        },
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
      orderSearch: {
        size: 100,
        filter: {
          not: [
            {
              type: 'exact',
              field: 'move_house',
              query: '0',
            },
          ],
        },
        sort: [
          {
            field: 'createdOn',
            order: 'desc',
          },
        ],
        showMainFile: true,
      },
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
    getPageList(search: $pageSearch) {
      data {
        ${pageQuery}
      }
      total
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
    getMemberGroupList(search: $memberGroupSearch) {
      data {
        id
        name
        type
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
    getOrderList(search: $orderSearch) {
      data ${orderQuery}
      total
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
