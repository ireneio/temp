import cookie from 'js-cookie';

import postGraphql from 'utils/postGraphql';
import { pageQuery } from './query';

export default ({ id, path, pageType, ...context }) => {
  const options = { ...context };

  switch (pageType) {
    case 'HOME':
      options.variables = {
        type: 'query getHomePage',
        keys: '$identity: String',
        values: {
          identity: cookie.get('identity'),
        },
      };
      options.query = `
        viewer {
          store {
            defaultHomePage {
              ${pageQuery}
            }
          }
        }
      `;
      break;

    case 'PRODUCTS':
      options.variables = {
        type: 'query getProductsPage',
        keys: '$identity: String',
        values: {
          identity: cookie.get('identity'),
        },
      };
      options.query = `
        viewer {
          store {
            defaultProductListPage {
              ${pageQuery}
            }
          }
        }
      `;
      break;

    case 'CUSTOM':
      options.variables = {
        type: 'query getCustomPage',
        keys: '$path: String!, $identity: String',
        values: {
          path,
          identity: cookie.get('identity'),
        },
      };
      options.query = `
        viewer {
          store {
            customPage(path: $path) {
              ${pageQuery}
            }
          }
        }
      `;
      break;

    default:
      options.variables = {
        keys: '$input: StorePageFilterInput, $identity: String',
        type: 'query getPage',
        values: {
          input: {
            pageId: id,
          },
          identity: cookie.get('identity'),
        },
      };
      options.query = `
        viewer {
          store {
            page(input: $input) {
              ${pageQuery}
            }
          }
        }
      `;
      break;
  }

  return postGraphql(options);
};
