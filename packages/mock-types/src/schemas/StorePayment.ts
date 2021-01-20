// import
import mock from '../mock';

// graphql typescript
import { storePaymentMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<storePaymentMockFragment>('StorePayment', [
  () => ({
    __typename: 'StorePayment',
    title: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: 'payment',
    },
  }),
]);
