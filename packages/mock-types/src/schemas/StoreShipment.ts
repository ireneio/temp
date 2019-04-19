// import
import { gql } from 'apollo-boost';
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { StoreShipmentMock } from './__generated__/StoreShipmentMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment StoreShipmentMock on StoreShipment {
    id
    title {
      ...localeFragment
    }
  }
  ${localeFragment}
`;

export default mock.add<StoreShipmentMock>('StoreShipment', [
  () => ({
    __typename: 'StoreShipment',
    id: uuid(),
    title: {
      __typename: 'Locale',
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: 'shipment',
      en_US: 'shipment',
      ja_JP: 'shipment',
      /* eslint-enable @typescript-eslint/camelcase */
    },
  }),
]);
