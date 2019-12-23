import postGraphql from 'utils/postGraphql';
import {
  viewer,
  cartQuery,
  pointsQuery,
  orderApplyQuery,
  stockNotificationQuery,
} from './query';

export default async function(args = {}) {
  const { isServer, XMeepshopDomain, cookie } = args;
  const variables = {
    keys:
      '$cartSearch: searchInputObjectType, $notificationSearch: searchInputObjectType, $orderApplySearch: searchInputObjectType, $hasUseablePoints: Boolean!, $expireBy: Int!',
    type: 'query updateMemberData',
    values: {
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
    },
  };

  const query = `
    ${viewer}
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
