// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { DraftTextModuleMock } from './__generated__/DraftTextModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment DraftTextModuleMock on DraftTextModule {
    content
  }
`;

export default mock.add<DraftTextModuleMock>('DraftTextModule', [
  () =>
    ({
      __typename: 'DraftTextModule',
      content:
        '{"blocks":[{"key":"f1494","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    } as DraftTextModuleMock),
]);
