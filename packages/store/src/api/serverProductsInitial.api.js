import postGraphql from 'utils/postGraphql';
import {
  viewer,
  viewerStoreQuery,
  pageQuery,
  menuQuery,
  activityQuery,
} from './query';

export default async context => {
  const {
    req: { cookies },
  } = context;
  const variables = {
    keys: `
      $pageFilter: StorePagesFilterInput,
      $menuSearch: searchInputObjectType,
      $expireBy: Int!,
      $identity: String,
      $activitiesFilter: StoreActivitiesFilterInput,
    `,
    type: 'query serverProductsInitial',
    values: {
      pageFilter: {
        type: 'PRODUCTS',
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
      activitiesFilter: {
        status: 1,
        plugin: 'groupDiscount',
      },
    },
  };

  const query = `
    ${viewer}
    ${viewerStoreQuery}
    viewer {
      store {
        pages(first: 1, filter: $pageFilter) {
          edges {
            node {
              ${pageQuery}
            }
          }
          total
        }

        activities(filter: $activitiesFilter) {
          ${activityQuery}
        }
      }
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
  `;

  const response = await postGraphql({
    ...context,
    query,
    variables,
  });
  return response;
};
