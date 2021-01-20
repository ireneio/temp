// import
import mock from '../mock';

// graphql typescript
import { shipmentInfoTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<shipmentInfoTypeMockFragment>('shipmentInfoType', [
  () => ({
    __typename: 'shipmentInfoType',
    status: 0,
    list: [{}],
  }),
  () => ({
    __typename: 'shipmentInfoType',
    status: 1,
    list: [{}],
  }),
  () => ({
    __typename: 'shipmentInfoType',
    status: 2,
    list: [{}],
  }),
  () => ({
    __typename: 'shipmentInfoType',
    status: 3,
    list: [{}],
  }),
]);
