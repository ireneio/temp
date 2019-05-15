// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { ExportFormatMock } from './__generated__/ExportFormatMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ExportFormatMock on ExportFormat {
    name
  }

  ${localeFragment}
`;

export default mock.add<ExportFormatMock>('ExportFormat', [
  () => ({
    __typename: 'ExportFormat',
    name: '匯出格式',
  }),
]);
