// import
import mock from '../mock';

// graphql typescript
import { paymentInfoTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<paymentInfoTypeMockFragment>('paymentInfoType', [
  () => ({
    __typename: 'paymentInfoType',
    status: 0,
  }),
  () => ({
    __typename: 'paymentInfoType',
    status: 1,
  }),
  () => ({
    __typename: 'paymentInfoType',
    status: 2,
  }),
  () => ({
    __typename: 'paymentInfoType',
    status: 3,
  }),
]);
