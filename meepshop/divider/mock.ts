// import
import uuid from 'uuid/v4';

// graphql typescript
import { dividerFragment } from './src/__generated__/dividerFragment';

// definition
export default {
  __typename: 'DividerModule',
  id: uuid(),
  width: 100,
  height: 50,
  justifyContent: 'CENTER',
  borderRadius: 0,
  background: '#cccccc',
} as dividerFragment;
