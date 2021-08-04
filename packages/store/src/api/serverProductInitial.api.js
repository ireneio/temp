import postGraphql from 'utils/postGraphql';
import { viewer, productQuery, menuQuery } from './query';

export default async context => {
  const {
    query: { pId },
    req: { cookies },
  } = context;
  if (!pId) throw new Error('Product id is not defined.');
  const variables = {
    keys: `
      $productSearch: searchInputObjectType,
      $menuSearch: searchInputObjectType,
      $expireBy: Int!,
      $identity: String,
    `,
    type: 'query serverProductInitial',
    values: {
      productSearch: {
        size: 1,
        from: 0,
        filter: {
          and: [
            {
              type: 'ids',
              ids: [pId],
            },
          ],
        },
        sort: [
          {
            field: 'createdAt',
            order: 'desc',
          },
        ],
        showVariants: true,
        showMainFile: true,
      },
      menuSearch: {
        size: 50,
        from: 0,
        filter: {
          and: [],
        },
        sort: [
          {
            field: 'createdAt',
            order: 'desc',
          },
        ],
      },
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
      identity: cookies?.identity,
    },
  };

  const query = `
    ${viewer}
    computeProductList(search: $productSearch) {
      data ${productQuery}
      total
    }
    getMenuList(search: $menuSearch) {
      data {
        ${menuQuery}
      }
      total
    }
    getColorList {
      data {
        id
        imgInfo {
          used
          repeat
          size
          image {
            id
            scaledSrc {
              w1920
            }
          }
        }
      }
      total
    }
  `;

  const response = await postGraphql({
    ...context,
    query,
    variables,
  });
  return response;
};
