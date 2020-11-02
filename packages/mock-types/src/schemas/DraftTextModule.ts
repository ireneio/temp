// import
import mock from '../mock';

// graphql typescript
import { draftTextModuleMockFragment } from './gqls/__generated__/draftTextModuleMockFragment';

// definition
export default mock.add<draftTextModuleMockFragment>('DraftTextModule', [
  () =>
    ({
      __typename: 'DraftTextModule',
      content:
        '{"blocks":[{"key":"f1494","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    } as draftTextModuleMockFragment),
]);
