// import
import mock from '../mock';

// graphql typescript
import { storeShipmentMockFragment } from './gqls/__generated__/storeShipmentMockFragment';

// definition
export default mock.add<storeShipmentMockFragment>('StoreShipment', [
  () => ({
    __typename: 'StoreShipment',
    title: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW: 'shipment',
    },
  }),
]);
