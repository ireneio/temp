import postGraphql from 'utils/postGraphql';

export default async function({ id: productId, variantId, ...context }) {
  const variables = {
    keys: '$search: [NewOrder]',
    type: 'mutation getActivitiesByProduct',
    values: {
      search: {
        products: [
          {
            productId,
            variantId,
            quantity: 1,
          },
        ],
        computeType: 'productPage',
      },
    },
  };

  const query = `
      computeOrderList(computeOrderList: $search) {
        categories {
          products {
            activityInfo {
              title {
                zh_TW
              }
              discountPrice
            }
          }
        }
      }
    } 
  `;
  const response = await postGraphql({
    ...context,
    query,
    variables,
  });
  return response;
}
