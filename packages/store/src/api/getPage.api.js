import cookie from 'js-cookie';

import postGraphql from 'utils/postGraphql';
import { pageQuery } from './query';

export default async ({ id, ...context }) => {
  const variables = {
    keys: '$input: StorePageFilterInput, $smartConversionToken: String',
    type: 'query getPage',
    values: {
      input: {
        pageId: id,
      },
      smartConversionToken: cookie.get('smartConversionToken'),
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
