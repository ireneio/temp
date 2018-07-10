import postGraphql from 'lib/postGraphql';

export default async function({
  id: productId,
  variantId,
  isServer,
  XMeepshopDomain,
  cookie,
}) {
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
    query,
    variables,
    XMeepshopDomain,
    cookie,
    isServer,
  });
  return response;
}
