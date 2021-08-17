import postGraphql from 'utils/postGraphql';
import { viewer, pageQuery } from './query';

export default async context => {
  const {
    query: { path },
    req: { cookies },
  } = context;

  if (!path) throw new Error('Page path is not defined.');

  const variables = {
    keys: `
      $path: String!
      $expireBy: Int!
      $identity: String
    `,
    type: 'query serverPagesInitial',
    values: {
      path,
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
      identity: cookies?.identity,
    },
  };

  const query = `
    ${viewer}
    viewer {
      store {
        customPage(path: $path) {
          ${pageQuery}
        }
      }
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
