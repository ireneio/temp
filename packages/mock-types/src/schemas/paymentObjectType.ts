// import
import gql from 'graphql-tag';
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import { paymentObjectTypeMock } from './__generated__/paymentObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment paymentObjectTypeMock on paymentObjectType {
    name
    template
    description
    atm {
      bankName
      bankCode
      account
      expireDate
    }
  }
`;

export default mock.add<paymentObjectTypeMock>('paymentObjectType', [
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'custom',
      description: 'payment description',
      atm: null,
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'allpay',
      description: null,
      atm: null,
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'ezpay',
      description: null,
      atm: null,
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'hitrust',
      description: null,
      atm: null,
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'gmo',
      description: null,
      atm: null,
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'cathay',
      description: null,
      atm: null,
    } as paymentObjectTypeMock),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'cathay',
      description: null,
      atm: {
        __typename: 'OrderPaymentAtm',
        bankName: 'bank name',
        bankCode: '013',
        account: 'xxxxxxxxxxxxx',
        expireDate: moment().format(),
      },
    } as paymentObjectTypeMock),
]);
