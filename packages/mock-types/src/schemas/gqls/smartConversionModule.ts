// import
import gql from 'graphql-tag';

// definition
export const smartConversionModuleMockFragment = gql`
  fragment smartConversionModuleMockFragment on SmartConversionModule {
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
