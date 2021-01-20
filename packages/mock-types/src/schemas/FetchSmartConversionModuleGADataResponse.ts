// import
import mock from '../mock';

// graphql typescript
import {
  FetchSmartConversionModuleGADataResponseStatusEnum,
  fetchSmartConversionModuleGADataResponseMockFragment,
} from '@meepshop/types/gqls/meepshop';

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
