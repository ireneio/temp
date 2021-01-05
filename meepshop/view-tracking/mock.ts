// import
import uuid from 'uuid/v4';

// definition
export default {
  __typename: 'ViewTrackingModule' as const,
  id: uuid(),
  tracking: {
    __typename: 'Tracking' as const,
    name: 'tracking',
    category: null,
  },
};
