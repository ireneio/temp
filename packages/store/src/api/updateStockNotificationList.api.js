import postGraphql from 'utils/postGraphql';
import { stockNotificationQuery } from './query';

export default async ({ variantId }) => {
  const variables = {
    keys: '$updateStockNotificationList: [UpdateStockNotification]',
    type: 'mutation updateStockNotificationList',
    values: {
      updateStockNotificationList: [
        {
          variantId,
        },
      ],
    },
  };

  const query = `
    updateStockNotificationList(updateStockNotificationList: $updateStockNotificationList) {
      ${stockNotificationQuery}
    }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  return response;
};
