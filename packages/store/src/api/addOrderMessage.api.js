import postGraphql from 'utils/postGraphql';
import { orderMessageQuery } from './query';

export default async function({ text, orderId }) {
  const variables = {
    keys: '$input: AddOrderMessageInput!',
    type: 'mutation Mutation',
    values: {
      input: {
        text,
        orderId,
      },
    },
  };
  const query = `
      addOrderMessage(input: $input) {
        ${orderMessageQuery}
      }
    }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  return response;
}
