// import
import uuid from 'uuid/v4';

// definition
export default {
  __typename: 'ProductDraftTextModule' as const,
  id: uuid(),
  product: {
    __typename: 'Product' as const,
    id: uuid(),
    draftText: {
      __typename: 'DraftTextProductCustomField' as const,
      value:
        '{"blocks":[{"key":"f1494","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
  },
};
