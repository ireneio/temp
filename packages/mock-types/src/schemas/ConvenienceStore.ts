// import
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { convenienceStoreMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<convenienceStoreMockFragment>('ConvenienceStore', [
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
