// import
import mock from '../mock';

// graphql typescript
import { shipmentObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<shipmentObjectTypeMockFragment>('shipmentObjectType', [
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
