import postGraphql from 'utils/postGraphql';
import { pageQuery } from './query';

export default async function({ path, pageType, ...context }) {
  const variables = {
    type: 'query getPages',
    keys: '$filter: StorePagesFilterInput',
    values: {
      filter: {
        path,
        type: pageType,
      },
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
}
