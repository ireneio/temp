// import
import uuid from 'uuid/v4';

// graphql typescript
import { productDraftTextFragment } from './src/__generated__/productDraftTextFragment';

// definition
export default {
  __typename: 'ProductDraftTextModule',
  id: uuid(),
  product: {
    __typename: 'Product',
    id: uuid(),
    draftText: {
      __typename: 'DraftTextProductCustomField',
      value:
        '{"blocks":[{"key":"f1494","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
  },
} as productDraftTextFragment;
