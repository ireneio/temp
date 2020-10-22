// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { FetchSmartConversionModuleGADataResponseStatusEnum } from '../../../../__generated__/admin';
import { FetchSmartConversionModuleGADataResponseMock } from './__generated__/FetchSmartConversionModuleGADataResponseMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment FetchSmartConversionModuleGADataResponseMock on FetchSmartConversionModuleGADataResponse {
    status
  }
`;

export default mock.add<FetchSmartConversionModuleGADataResponseMock>(
  'FetchSmartConversionModuleGADataResponse',
  [
    () => ({
      __typename: 'FetchSmartConversionModuleGADataResponse',
      status: 'OK' as FetchSmartConversionModuleGADataResponseStatusEnum,
    }),
    () => ({
      __typename: 'FetchSmartConversionModuleGADataResponse',
      status: 'FAIL_GA_SERVER_ERROR' as FetchSmartConversionModuleGADataResponseStatusEnum,
    }),
  ],
);
