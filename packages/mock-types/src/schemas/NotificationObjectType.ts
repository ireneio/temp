// import
import mock from '../mock';

// graphql typescript
import { notificationObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<notificationObjectTypeMockFragment>(
  'NotificationObjectType',
  [
    () => ({
      __typename: 'NotificationObjectType',
      newsletters: {
        __typename: 'newsletters',
        cancelEmail: true,
      },
    }),
    () => ({
      __typename: 'NotificationObjectType',
      newsletters: {
        __typename: 'newsletters',
        cancelEmail: false,
      },
    }),
  ],
);
