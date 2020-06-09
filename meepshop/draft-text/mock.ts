// import
import uuid from 'uuid/v4';

// graphql typescript
import { draftTextFragment } from './src/__generated__/draftTextFragment';

// definition
export default {
  __typename: 'DraftTextModule',
  id: uuid(),
  content:
    '{"blocks":[{"key":"f1494","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
} as draftTextFragment;
