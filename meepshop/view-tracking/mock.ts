// import
import uuid from 'uuid/v4';

// graphql typescript
import { viewTrackingFragment } from './src/gqls/__generated__/viewTrackingFragment';

// definition
export default {
  id: uuid(),
  __typename: 'ViewTrackingModule',
  tracking: {
    __typename: 'Tracking',
    name: 'tracking',
  },
} as viewTrackingFragment;
