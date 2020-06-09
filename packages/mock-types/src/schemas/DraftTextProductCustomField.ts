// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { DraftTextProductCustomFieldMock } from './__generated__/DraftTextProductCustomFieldMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment DraftTextProductCustomFieldMock on DraftTextProductCustomField {
    value
  }
`;

export default mock.add<DraftTextProductCustomFieldMock>(
  'DraftTextProductCustomField',
  [
    () => ({
      __typename: 'DraftTextProductCustomField',
      value:
        '{"blocks":[{"key":"f1494","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    }),
  ],
);
