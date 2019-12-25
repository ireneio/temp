// import
import gql from 'graphql-tag';

import mock from '../mock';

import getLocale from './utils/getLocale';

// graphql typescript
import { StoreShipmentMock } from './__generated__/StoreShipmentMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment StoreShipmentMock on StoreShipment {
    title {
      ...localeFragment
    }
  }

  ${localeFragment}
`;

export default mock.add<StoreShipmentMock>('StoreShipment', [
  () => ({
    __typename: 'StoreShipment',
    title: getLocale('shipment'),
  }),
]);
