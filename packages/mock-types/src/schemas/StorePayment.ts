// import
import { gql } from 'apollo-boost';

import mock from '../mock';

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
    title: {
      __typename: 'Locale',
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: 'payment',
      en_US: 'payment',
      ja_JP: 'payment',
      vi_VN: 'payment',
      /* eslint-enable @typescript-eslint/camelcase */
    },
  }),
]);
