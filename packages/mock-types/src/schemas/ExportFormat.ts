// import
import mock from '../mock';

// graphql typescript
import { exportFormatMockFragment } from './gqls/__generated__/exportFormatMockFragment';

// definition
export default mock.add<exportFormatMockFragment>('ExportFormat', [
  () => ({
    __typename: 'ExportFormat',
    name: '匯出格式',
  }),
]);
