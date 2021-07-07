import postGraphql from 'utils/postGraphql';
import {
  viewer,
  viewerStoreQuery,
  pageQuery,
  menuQuery,
  activityQuery,
} from './query';

export default context => {
  const {
    req: { cookies },
  } = context;
  const variables = {
    keys: `
      $menuSearch: searchInputObjectType,
      $expireBy: Int!,
      $identity: String,
      $activitiesFilter: StoreActivitiesFilterInput,
    `,
    type: 'query serverProductsInitial',
    values: {
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
        defaultProductListPage {
          ${pageQuery}
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

  return postGraphql({
    ...context,
    query,
    variables,
  });
};
