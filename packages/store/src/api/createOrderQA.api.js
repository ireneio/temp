import postGraphql from 'utils/postGraphql';
import { orderQAQuery } from './query';

/**
 * @param {*} orderQA :{
 *   orderId,
 *   qa: [
 *     {
 *       question
 *     }
 *   ]
 * }
 */
export default async function({ orderQA }) {
  const variables = {
    keys: '$createOrderQA: [NewOrderQA]',
    type: 'mutation CreateOrderQA',
    values: {
      createOrderQA: [orderQA],
    },
  };

  const query = `
      createOrderQA(createOrderQA: $createOrderQA) {
        ${orderQAQuery}
      }
    } 
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  return response;
}
