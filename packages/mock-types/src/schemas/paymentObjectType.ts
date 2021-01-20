// import
import moment from 'moment';

import mock from '../mock';

// graphql typescript
import {
  PaymentTemplateEnum,
  paymentObjectTypeMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<paymentObjectTypeMockFragment>('paymentObjectType', [
  () => ({
    __typename: 'paymentObjectType',
    name: 'payment name',
    template: 'custom' as PaymentTemplateEnum,
    description: 'payment description',
    atm: null,
  }),
  () => ({
    __typename: 'paymentObjectType',
    name: 'payment name',
    template: 'allpay' as PaymentTemplateEnum,
    description: null,
    atm: null,
  }),
  () => ({
    __typename: 'paymentObjectType',
    name: 'payment name',
    template: 'ezpay' as PaymentTemplateEnum,
    description: null,
    atm: null,
  }),
  () => ({
    __typename: 'paymentObjectType',
    name: 'payment name',
    template: 'hitrust' as PaymentTemplateEnum,
    description: null,
    atm: null,
  }),
  () => ({
    __typename: 'paymentObjectType',
    name: 'payment name',
    template: 'gmo' as PaymentTemplateEnum,
    description: null,
    atm: null,
  }),
  () => ({
    __typename: 'paymentObjectType',
    name: 'payment name',
    template: 'cathay' as PaymentTemplateEnum,
    description: null,
    atm: null,
  }),
  () => ({
    __typename: 'paymentObjectType',
    name: 'payment name',
    template: 'cathay_atm' as PaymentTemplateEnum,
    description: null,
    atm: {
      __typename: 'OrderPaymentAtm',
      bankName: 'bank name',
      bankCode: '013',
      account: 'xxxxxxxxxxxxx',
      expireDate: moment().format(),
    },
  }),
]);
