// import
import gql from 'graphql-tag';

// definition
export const pageFragment = gql`
  fragment pageFragment on StoreExperiment {
    hiddingMeepshopMaxInFooterEnabled
  }
`;
