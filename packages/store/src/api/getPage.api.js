import postGraphql from 'utils/postGraphql';
import { pageQuery } from './query';

export default async ({ id, ...context }) => {
  const variables = {
    keys: '$input: StorePageFilterInput',
    type: 'query getPage',
    values: {
      input: {
        pageId: id,
      },
    },
  };

  const query = `
    viewer {
      store {
        page(input: $input) {
          ${pageQuery}
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
