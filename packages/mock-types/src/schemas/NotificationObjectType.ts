// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { NotificationObjectTypeMock } from './__generated__/NotificationObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment NotificationObjectTypeMock on NotificationObjectType {
    newsletters {
      cancelEmail
    }
  }
`;

export default mock.add<NotificationObjectTypeMock>('NotificationObjectType', [
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
]);
