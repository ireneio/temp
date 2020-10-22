import cookie from 'js-cookie';

import postGraphql from 'utils/postGraphql';
import { pageQuery } from './query';

export default async ({ path, pageType, ...context }) => {
  const variables = {
    type: 'query getPages',
    keys: '$filter: StorePagesFilterInput, $smartConversionToken: String',
    values: {
      filter: {
        path,
        type: pageType,
      },
      smartConversionToken: cookie.get('smartConversionToken'),
    },
  };

  const query = `
    viewer {
      store {
        pages(first: 50, filter: $filter) {
          edges {
            node {
              ${pageQuery}
            }
          }
          total
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
