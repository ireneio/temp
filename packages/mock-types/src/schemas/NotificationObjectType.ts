// import
import mock from '../mock';

// graphql typescript
import { notificationObjectTypeMockFragment } from './gqls/__generated__/notificationObjectTypeMockFragment';

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
