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
    type: 'query serverProductsInitial',
    values: {
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
  `;

  return postGraphql({
    ...context,
    query,
    variables,
  });
};
