// import
import mock from '../mock';

// graphql typescript
import { draftTextProductCustomFieldMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<draftTextProductCustomFieldMockFragment>(
  'DraftTextProductCustomField',
  [
    () => ({
      __typename: 'DraftTextProductCustomField',
      value:
        '{"blocks":[{"key":"f1494","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    }),
  ],
);
