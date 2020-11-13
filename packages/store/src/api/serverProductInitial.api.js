import postGraphql from 'utils/postGraphql';
import {
  viewer,
  viewerStoreQuery,
  productQuery,
  menuQuery,
  activityQuery,
} from './query';

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
      $smartConversionToken: String,
      $activitiesFilter: StoreActivitiesFilterInput,
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
      smartConversionToken: cookies?.smartConversionToken,
      activitiesFilter: {
        status: 1,
        plugin: 'groupDiscount',
      },
    },
  };

  const query = `
    ${viewer}
    ${viewerStoreQuery}
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
          files {
            image
          }
        }
      }
      total
    }
    viewer {
      store {
        activities(filter: $activitiesFilter) {
          ${activityQuery}
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
};
