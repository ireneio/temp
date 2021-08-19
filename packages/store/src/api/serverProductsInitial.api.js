import postGraphql from 'utils/postGraphql';
import { viewer, pageQuery, menuQuery } from './query';

export default context => {
  const {
    req: { cookies },
  } = context;
  const variables = {
    keys: `
      $menuSearch: searchInputObjectType,
      $expireBy: Int!,
      $identity: String,
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
    },
  };

  const query = `
    ${viewer}
    viewer {
      store {
        defaultProductListPage {
          ${pageQuery}
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
