// import
import gql from 'graphql-tag';

// definition
export const storeExperimentMockFragment = gql`
  fragment storeExperimentMockFragment on StoreExperiment {
    ecfitEnabled
    hiddingMeepshopMaxInFooterEnabled
  }
`;
