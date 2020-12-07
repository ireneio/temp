// import
import gql from 'graphql-tag';

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
