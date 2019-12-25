// import
import gql from 'graphql-tag';

import mock from '../mock';

import getLocale from './utils/getLocale';

// graphql typescript
import { StorePaymentMock } from './__generated__/StorePaymentMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment StorePaymentMock on StorePayment {
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

export default mock.add<StorePaymentMock>('StorePayment', [
  () => ({
    __typename: 'StorePayment',
    title: getLocale('payment'),
  }),
]);
