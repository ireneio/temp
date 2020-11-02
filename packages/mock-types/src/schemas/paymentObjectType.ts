// import
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import { paymentObjectTypeMockFragment } from './gqls/__generated__/paymentObjectTypeMockFragment';

// definition
export default mock.add<paymentObjectTypeMockFragment>('paymentObjectType', [
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'custom',
      description: 'payment description',
      atm: null,
    } as paymentObjectTypeMockFragment),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'allpay',
      description: null,
      atm: null,
    } as paymentObjectTypeMockFragment),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'ezpay',
      description: null,
      atm: null,
    } as paymentObjectTypeMockFragment),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'hitrust',
      description: null,
      atm: null,
    } as paymentObjectTypeMockFragment),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'gmo',
      description: null,
      atm: null,
    } as paymentObjectTypeMockFragment),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'cathay',
      description: null,
      atm: null,
    } as paymentObjectTypeMockFragment),
  () =>
    ({
      __typename: 'paymentObjectType',
      name: 'payment name',
      template: 'cathay_atm',
      description: null,
      atm: {
        __typename: 'OrderPaymentAtm',
        bankName: 'bank name',
        bankCode: '013',
        account: 'xxxxxxxxxxxxx',
        expireDate: moment().format(),
      },
    } as paymentObjectTypeMockFragment),
]);
