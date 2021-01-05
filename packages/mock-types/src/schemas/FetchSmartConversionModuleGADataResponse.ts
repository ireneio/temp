// import
import mock from '../mock';

// graphql typescript
import { FetchSmartConversionModuleGADataResponseStatusEnum } from '../../../../__generated__/meepshop';
import { fetchSmartConversionModuleGADataResponseMockFragment } from './gqls/__generated__/fetchSmartConversionModuleGADataResponseMockFragment';

// definition
export default mock.add<fetchSmartConversionModuleGADataResponseMockFragment>(
  'FetchSmartConversionModuleGADataResponse',
  [
    () => ({
      __typename: 'FetchSmartConversionModuleGADataResponse',
      status: 'OK' as FetchSmartConversionModuleGADataResponseStatusEnum,
    }),
    () => ({
      __typename: 'FetchSmartConversionModuleGADataResponse',
      status: 'FAIL_GA_ERROR' as FetchSmartConversionModuleGADataResponseStatusEnum,
    }),
  ],
);
