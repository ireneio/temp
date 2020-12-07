import cookie from 'js-cookie';

import postGraphql from 'utils/postGraphql';
import { pageQuery } from './query';

export default async ({ id, ...context }) => {
  const variables = {
    keys: '$input: StorePageFilterInput, $identity: String',
    type: 'query getPage',
    values: {
      input: {
        pageId: id,
      },
      identity: cookie.get('identity'),
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
