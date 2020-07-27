import postGraphql from 'utils/postGraphql';
import {
  viewer,
  cartQuery,
  pointsQuery,
  stockNotificationQuery,
} from './query';

export default async (args = {}) => {
  const { isServer, XMeepshopDomain, cookie } = args;
  const variables = {
    keys:
      '$cartSearch: searchInputObjectType, $notificationSearch: searchInputObjectType, $hasUseablePoints: Boolean!, $expireBy: Int!',
    type: 'query updateMemberData',
    values: {
      cartSearch: {
        showDetail: true,
      },
      notificationSearch: {},
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
};
