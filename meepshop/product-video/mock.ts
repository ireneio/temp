// import
import uuid from 'uuid/v4';

// graphql typescript
import { productVideoFragment } from './src/__generated__/productVideoFragment';

// definition
export default {
  __typename: 'ProductVideoModule',
  id: uuid(),
  width: '100',
  ratio: 'Ratio16to9',
  product: {
    __typename: 'Product',
    id: uuid(),
    videoLink: {
      __typename: 'VideoLinkProductCustomField',
      value:
        'https://www.youtube.com/embed/L8FK64bLJKE?autoplay=0&mute=0&controls=1&origin=https%3A%2F%2Fadmin.stage.meepcloud.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3',
    },
  },
} as productVideoFragment;
