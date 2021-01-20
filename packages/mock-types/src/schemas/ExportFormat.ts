// import
import mock from '../mock';

// graphql typescript
import { exportFormatMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<exportFormatMockFragment>('ExportFormat', [
  () => ({
    __typename: 'ExportFormat',
    name: '匯出格式',
  }),
]);
