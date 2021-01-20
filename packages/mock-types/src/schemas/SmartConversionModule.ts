// import
import mock from '../mock';

// graphql typescript
import {
  SmartConversionModuleStatusEnum,
  smartConversionModuleMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<smartConversionModuleMockFragment>(
  'SmartConversionModule',
  [
    () => ({
      __typename: 'SmartConversionModule',
      id: 'smart-conversion-module-1',
      status: 'ONGOING' as SmartConversionModuleStatusEnum,
      durationDays: 3,
      pageTitle: 'pageTitle',
      samples: [
        {
          __typename: 'SmartConversionModuleSample',
          eventName: 'pageTitle_樣本1',
          transactionCount: 5423,
          transactionPercentage: 0.54,
          conversionRate: 0.21,
        },
        {
          __typename: 'SmartConversionModuleSample',
          eventName: 'pageTitle_樣本2',
          transactionCount: 1273,
          transactionPercentage: 0.12,
          conversionRate: 0.51,
        },
        {
          __typename: 'SmartConversionModuleSample',
          eventName: 'pageTitle_樣本3',
          transactionCount: 3419,
          transactionPercentage: 0.34,
          conversionRate: 0.18,
        },
      ],
    }),
    () => ({
      __typename: 'SmartConversionModule',
      id: 'smart-conversion-module-2',
      status: 'END' as SmartConversionModuleStatusEnum,
      durationDays: 3,
      pageTitle: 'pageTitle',
      samples: [
        {
          __typename: 'SmartConversionModuleSample',
          eventName: 'pageTitle_樣本1',
          transactionCount: 5423,
          transactionPercentage: 0.54,
          conversionRate: 0.21,
        },
        {
          __typename: 'SmartConversionModuleSample',
          eventName: 'pageTitle_樣本2',
          transactionCount: 1273,
          transactionPercentage: 0.12,
          conversionRate: 0.51,
        },
        {
          __typename: 'SmartConversionModuleSample',
          eventName: 'pageTitle_樣本3',
          transactionCount: 3419,
          transactionPercentage: 0.34,
          conversionRate: 0.18,
        },
      ],
    }),
  ],
);
