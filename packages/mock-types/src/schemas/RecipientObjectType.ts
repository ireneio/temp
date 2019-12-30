// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { RecipientObjectTypeMock } from './__generated__/RecipientObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment RecipientObjectTypeMock on RecipientObjectType {
    name
    email
    mobile
    address {
      streetAddress
    }
    receiverStoreName
    receiverStoreID
    receiverStoreAddress
    comment
  }
`;

export default mock.add<RecipientObjectTypeMock>('RecipientObjectType', [
  () => ({
    __typename: 'RecipientObjectType',
    name: 'recipient',
    email: 'recipient@meepshop.com',
    mobile: '0987654321',
    address: {
      __typename: 'AddressObjectType',
      streetAddress: 'meepshop',
    },
    receiverStoreName: 'receiver store name',
    receiverStoreID: 'receiver store ID',
    receiverStoreAddress: 'receiver store address',
    comment: `1. order comment
2. order comment
3. order comment`,
  }),
]);
