import postGraphql from 'utils/postGraphql';
import { viewer, pageQuery } from './query';

export default context => {
  const {
    req: { cookies },
  } = context;
  const variables = {
    keys: `
      $expireBy: Int!,
      $identity: String,
    `,
    type: 'query serverIndexInitial',
    values: {
      expireBy: parseInt(new Date() / 1000, 10) + 30 * 24 * 60 * 60, // 30 days
      identity: cookies?.identity,
    },
  };

  const query = `
    ${viewer}
    viewer {
      store {
        defaultHomePage {
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

  return postGraphql({
    ...context,
    query,
    variables,
  });
};
