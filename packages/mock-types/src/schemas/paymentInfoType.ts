// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { paymentInfoTypeMock } from './__generated__/paymentInfoTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment paymentInfoTypeMock on paymentInfoType {
    status
  }
`;

export default mock.add<paymentInfoTypeMock>('paymentInfoType', [
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
