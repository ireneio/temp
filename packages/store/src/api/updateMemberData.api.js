import postGraphql from 'utils/postGraphql';
import { viewer, cartQuery, stockNotificationQuery } from './query';

export default async (args = {}) => {
  const { isServer, XMeepshopDomain, cookie } = args;
  const variables = {
    keys:
      '$cartSearch: searchInputObjectType, $notificationSearch: searchInputObjectType, $expireBy: Int!',
    type: 'query updateMemberData',
    values: {
      cartSearch: {
        showDetail: true,
      },
      notificationSearch: {},
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
