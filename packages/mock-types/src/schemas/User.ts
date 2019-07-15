// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { UserMock } from './__generated__/UserMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment UserMock on User {
    role
    order(orderId: "test") {
      id
    }
    groupId
    name
    email
    gender
    additionalInfo {
      tel
      mobile
    }
    recipientData {
      name
      tel
      mobile
    }
    birthday {
      year
      month
      day
    }
  }
`;

export default mock.add<UserMock>('User', [
  () =>
    ({
      __typename: 'User',
      role: 'MERCHANT',
      groupId: null,
      group: null,
      name: null,
      email: null,
      gender: null,
      additionalInfo: null,
      recipientData: null,
      birthday: null,
      order: null,
    } as UserMock),
  () =>
    ({
      __typename: 'User',
      role: 'HELPER',
      groupId: 'helper-permission',
      group: [{}],
      name: 'name',
      email: 'test@email.com',
      gender: 0,
      additionalInfo: {
        __typename: 'AdditionalInfoObjectType',
        tel: '02-11111111',
        mobile: '0912345678',
      },
      recipientData: [
        {
          __typename: 'RecipientObjectType',
          name: 'name',
          tel: '02-11111111',
          mobile: '0912345678',
        },
      ],
      birthday: {
        __typename: 'BirthdayObjectType',
        year: 2019,
        month: 1,
        day: 1,
      },
      order: {
        __typename: 'Order',
        id: 'order-id',
      },
    } as UserMock),
]);
