// import
import uuid from 'uuid/v4';

// definition
export default {
  __typename: 'ProductIframeModule' as const,
  id: uuid(),
  product: {
    __typename: 'Product' as const,
    id: uuid(),
    info: {
      __typename: 'Locale' as const,
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: '<div style="color: blue;">iframe_with_normal_tag</div>',
    },
  },
};
