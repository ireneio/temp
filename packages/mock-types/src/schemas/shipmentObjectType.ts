// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { shipmentObjectTypeMock } from './__generated__/shipmentObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment shipmentObjectTypeMock on shipmentObjectType {
    name
    recipient {
      name
    }
  }
`;

export default mock.add<shipmentObjectTypeMock>('shipmentObjectType', [
  () => ({
    __typename: 'shipmentObjectType',
    name: 'shipment name',
    recipient: {
      __typename: 'RecipientObjectType',
      name: 'recipient',
    },
  }),
]);
