// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { SmartConversionModuleStatusEnum } from '../../../../__generated__/admin';
import { SmartConversionModuleMock } from './__generated__/SmartConversionModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment SmartConversionModuleMock on SmartConversionModule {
    id
    status
    durationDays
    pageTitle
    samples {
      eventName
      transactionCount
      transactionPercentage
      conversionRate
    }
  }
`;

export default mock.add<SmartConversionModuleMock>('SmartConversionModule', [
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
]);
