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
    number
    description
  }
`;

export default mock.add<shipmentObjectTypeMock>('shipmentObjectType', [
  () => ({
    __typename: 'shipmentObjectType',
    name: 'shipment name',
    number: null,
    description: null,
    recipient: null,
  }),
  () => ({
    __typename: 'shipmentObjectType',
    name: 'shipment name',
    number: 'shipment number',
    description: 'shipment description',
    recipient: {},
  }),
]);
