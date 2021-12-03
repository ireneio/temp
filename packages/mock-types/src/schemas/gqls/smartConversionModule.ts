// import
import { gql } from '@apollo/client';

// definition
export const smartConversionModuleMockFragment = gql`
  fragment smartConversionModuleMockFragment on SmartConversionModule {
    id
    status
    durationDays
    samples {
      eventName
      transactionCount
      transactionPercentage
      conversionRate
    }
  }
`;
