// import
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { ConvenienceStoreMock } from './__generated__/ConvenienceStoreMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ConvenienceStoreMock on ConvenienceStore {
    storeNumber
    famiServiceNumber
    name
    address
    phones
    ecpayStoreNumber
    ezshipStoreNumber
  }
`;

export default mock.add<ConvenienceStoreMock>('ConvenienceStore', [
  () => ({
    __typename: 'ConvenienceStore',
    storeNumber: uuid(),
    famiServiceNumber: null,
    name: '7-11 新廣店',
    address: '新北市新店區中正路542之5號1樓',
    phones: ['02-22188613', '02-22195702'],
    ecpayStoreNumber: '173782',
    ezshipStoreNumber: null,
  }),
  () => ({
    __typename: 'ConvenienceStore',
    storeNumber: uuid(),
    famiServiceNumber: uuid(),
    name: '全家新店正中店',
    address: '新北市新店區中正路366號',
    phones: ['02-77302678', '02-22195702'],
    ecpayStoreNumber: null,
    ezshipStoreNumber: '018091',
  }),
]);
