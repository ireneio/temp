// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { paymentObjectTypeMock } from './__generated__/paymentObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment paymentObjectTypeMock on paymentObjectType {
    template
  }
`;

export default mock.add<paymentObjectTypeMock>('paymentObjectType', [
  () =>
    ({
      __typename: 'paymentObjectType',
      template: 'custom',
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      template: 'allpay',
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      template: 'ezpay',
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      template: 'hitrust',
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      template: 'gmo',
    } as paymentObjectTypeMock),
]);
