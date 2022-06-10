// import
import mock from '../mock';

// graphql typescript
import {
  ViewerTypeEnum,
  userMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<userMockFragment>('User', [
  () => ({
    __typename: 'User',
    role: 'SHOPPER' as ViewerTypeEnum,
    groupId: null,
    group: null,
    name: null,
    email: null,
    gender: null,
    tel: null,
    mobile: null,
    address: null,
    shippableRecipientAddresses: [],
    birthday: null,
    order: {
      __typename: 'Order',
      id: 'order-id',
    },
  }),
  () => ({
    __typename: 'User',
    role: 'GUEST' as ViewerTypeEnum,
    groupId: null,
    group: null,
    name: null,
    email: null,
    gender: null,
    tel: null,
    mobile: null,
    address: null,
    shippableRecipientAddresses: [],
    birthday: null,
    order: {
      __typename: 'Order',
      id: 'order-id',
    },
  }),
  () => ({
    __typename: 'User',
    role: 'MERCHANT' as ViewerTypeEnum,
    groupId: null,
    group: null,
    name: null,
    email: null,
    tel: null,
    mobile: null,
    gender: null,
    address: null,
    shippableRecipientAddresses: [],
    birthday: null,
    order: null,
  }),
  () => ({
    __typename: 'User',
    role: 'HELPER' as ViewerTypeEnum,
    groupId: 'helper-permission',
    group: [{}],
    name: 'name',
    email: 'test@email.com',
    gender: 0,
    tel: '02-11111111',
    mobile: '0912345678',
    shippableRecipientAddresses: [{}],
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
  }),
]);
