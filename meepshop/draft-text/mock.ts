// import
import uuid from 'uuid/v4';

// definition
export default {
  __typename: 'DraftTextModule' as const,
  id: uuid(),
  content:
    '{"blocks":[{"key":"f1494","text":"test","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
};
