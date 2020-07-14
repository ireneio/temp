// import
import uuid from 'uuid/v4';

// graphql typescript
import { productIframeFragment } from './src/__generated__/productIframeFragment';

// definition
export default {
  __typename: 'ProductIframeModule',
  id: uuid(),
  product: {
    __typename: 'Product',
    id: uuid(),
    info: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '<div style="color: blue;">iframe_with_normal_tag</div>',
    },
  },
} as productIframeFragment;
