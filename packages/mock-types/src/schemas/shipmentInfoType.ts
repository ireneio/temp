// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { shipmentInfoTypeMock } from './__generated__/shipmentInfoTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment shipmentInfoTypeMock on shipmentInfoType {
    status
  }
`;

export default mock.add<shipmentInfoTypeMock>('shipmentInfoType', [
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
