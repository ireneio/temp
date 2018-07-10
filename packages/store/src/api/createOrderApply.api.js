import postGraphql from 'lib/postGraphql';
import orderApplyQuery from './query/orderApply.query';

export default async function(order) {
  const variables = {
    keys: '$createOrderApplyList: [NewOrderApply]',
    type: 'mutation CreateOrderApplyList',
    values: {
      createOrderApplyList: order,
    },
  };

  const query = `
    createOrderApplyList( createOrderApplyList: $createOrderApplyList ) {
      ${orderApplyQuery}
    }
  `;
  const response = await postGraphql({
    query,
    variables,
  });
  return response;
}
