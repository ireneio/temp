import postGraphql from 'lib/postGraphql';

export default async function({ id, paidMessage }) {
  const variables = {
    keys: '$updateOrderList: [UpdateOrder]',
    type: 'mutation sendPaymentNotification',
    values: {
      updateOrderList: [
        {
          id,
          paidMessage,
        },
      ],
    },
  };
  const query = `
  updateOrderList(updateOrderList: $updateOrderList) {
    id
    paidMessage {
      note
    }
  }
  `;
  const response = await postGraphql({ query, variables });
  return response;
}
