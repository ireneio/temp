import postGraphql from 'utils/postGraphql';
import {
  cartQuery,
  userQuery,
  wishListQuery,
  orderQuery,
  pointsQuery,
  orderApplyQuery,
  stockNotificationQuery,
} from './query';

export default async function(args = {}) {
  const { isServer, XMeepshopDomain, cookie } = args;
  const variables = {
    keys:
      '$userSearch: searchInputObjectType, $cartSearch: searchInputObjectType, $wishlistSearch: searchInputObjectType, $notificationSearch: searchInputObjectType, $orderSearch: searchInputObjectType, $orderApplySearch: searchInputObjectType, $hasUseablePoints: Boolean!, $expireBy: Int!',
    type: 'query updateMemberData',
    values: {
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
    },
  };

  const query = `
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
