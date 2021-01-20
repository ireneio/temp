// import
import mock from '../mock';

// graphql typescript
import { recipientObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<recipientObjectTypeMockFragment>(
  'RecipientObjectType',
  [
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
  ],
);
