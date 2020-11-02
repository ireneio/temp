// import
import mock from '../mock';

// graphql typescript
import { fetchSmartConversionModuleGADataResponseMockFragment } from './gqls/__generated__/fetchSmartConversionModuleGADataResponseMockFragment';

// definition
export default mock.add<fetchSmartConversionModuleGADataResponseMockFragment>(
  'FetchSmartConversionModuleGADataResponse',
  [
    () =>
      ({
        __typename: 'FetchSmartConversionModuleGADataResponse',
        status: 'OK',
      } as fetchSmartConversionModuleGADataResponseMockFragment),
    () =>
      ({
        __typename: 'FetchSmartConversionModuleGADataResponse',
        status: 'FAIL_GA_ERROR',
      } as fetchSmartConversionModuleGADataResponseMockFragment),
  ],
);
