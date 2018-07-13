import postGraphql from 'utils/postGraphql';
import {
  productQuery,
  storeAppQuery,
  menuQuery,
  storeSettingQuery,
  colorQuery,
  activityQuery,
  cartQuery,
  userQuery,
  wishListQuery,
  orderQuery,
  pointsQuery,
  orderApplyQuery,
  pageAdTrackQuery,
  webTrackQuery,
  orderQAQuery,
  stockNotificationQuery,
} from './query';

export default async function({ XMeepshopDomain, cookie, pId }) {
  const isServer = true;
  if (!pId) throw new Error('Product id is not dfined.');
  const variables = {
    keys:
      '$productSearch: searchInputObjectType, $menuSearch: searchInputObjectType, $storeSearch: searchInputObjectType, $colorSearch: searchInputObjectType, $activitySearch: searchInputObjectType, $storeAppSearch: searchInputObjectType, $paymentSearch: searchInputObjectType, $memberGroupSearch: searchInputObjectType, $appLoginSearch: searchInputObjectType, $exchangeRateSearch: String, $userSearch: searchInputObjectType, $cartSearch: searchInputObjectType, $wishlistSearch: searchInputObjectType, $notificationSearch: searchInputObjectType, $orderSearch: searchInputObjectType, $orderApplySearch: searchInputObjectType, $hasUseablePoints: Boolean!, $expireBy: Int!, $pageAdTrackSearch: PageAdTrackInfoInput, $webTrackSearch: searchInputObjectType, $orderQASearch: searchInputObjectType',
    type: 'query serverProductInitial',
    values: {
      productSearch: {
        size: 1,
        from: 0,
        filter: {
          and: [
            {
              type: 'ids',
              ids: [pId],
            },
          ],
        },
        sort: [
          {
            field: 'createdOn',
            order: 'desc',
          },
        ],
        showVariants: true,
        showMainFile: true,
        showCartlockQty: true,
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
      storeSearch: {
        filter: {
          and: [],
        },
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
              query: 1,
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
              query: 1,
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
      exchangeRate: {
        search: 'USD',
      },
      userSearch: {
        filter: {
          and: [],
        },
      },
      cartSearch: {
        showDetail: true,
      },
      wishlistSearch: {},
      notificationSearch: {},
      orderSearch: {
        size: 100,
        filter: {
          not: [
            {
              type: 'exact',
              field: 'move_house',
              query: 0,
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
      pageAdTrackSearch: {
        page: 'initCode',
      },
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
              query: 'google_adwords',
            },
            {
              type: 'exact',
              field: 'trackType',
              query: 'google_tag_manager',
            },
          ],
        },
      },
      orderQASearch: {
        sort: [
          {
            field: 'createdOn',
            order: 'desc',
          },
        ],
      },
    },
  };

  const query = `
    computeProductList(
      search: $productSearch
    ) {
      data ${productQuery}
      total
    }
    getMenuList(search: $menuSearch) {
      data {
        ${menuQuery}
      }
      total
    }
    getStoreList(search: $storeSearch) {
      data {
        ${storeSettingQuery}
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
    getStorePaymentList( search: $paymentSearch ) {
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
      }
    }
    getAppLoginList(search: $appLoginSearch) {
      data {
        id
        appId
      }
    }
    getExchangeRateList(baseCurrency: $exchangeRateSearch) {
      data {
        timestamp
        base
        rates
        _error
      }
    }
    isLogin {
      isLogin
      expireTime
    }
    getUserList(search: $userSearch) {
      data {
        ${userQuery}
      }
    }
    getCartList(search: $cartSearch) {
      data {
        ${cartQuery}
      }
    }
    getWishListList(search: $wishlistSearch) {
      data {
        ${wishListQuery}
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
    getExpireSoonUserPointList(expireBy: $expireBy) {
      total
    }
    getPageAdTrack(getPageAdTrack: $pageAdTrackSearch) {
      data {
        ${pageAdTrackQuery}
      }
    }
    getWebTrackList(search: $webTrackSearch) {
      data {
        ${webTrackQuery}
      }
    }
    getOrderQAList(search: $orderQASearch) {
      data {
        ${orderQAQuery}
      }
    }
  `;

  const response = await postGraphql({
    query,
    variables,
    isServer,
    XMeepshopDomain,
    cookie,
  });
  return response;
}
