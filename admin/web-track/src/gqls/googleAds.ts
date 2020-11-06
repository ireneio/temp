// import
import gql from 'graphql-tag';

// definition
export const googleAdsStoreUpdateCacheFragment = gql`
  fragment googleAdsStoreUpdateCacheFragment on Store {
    id
    adTracks {
      googleAdwordsConfig
      googleAdwordsSignUp
      googleAdwordsBeginCheckout
      googleAdwordsPurchase
    }
  }
`;

export const googleAdsStoreFragment = gql`
  fragment googleAdsStoreFragment on Store {
    id
    setting {
      googleFeedsLink
    }
    ...googleAdsStoreUpdateCacheFragment
  }

  ${googleAdsStoreUpdateCacheFragment}
`;
