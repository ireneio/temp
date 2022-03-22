// import
import { gql } from '@apollo/client';

// graphql import
import { affiliateFragment } from './affiliate';

// definition
export const getFeatureSubscriptions = gql`
  query getFeatureSubscriptions {
    viewer {
      id
      store {
        id
        isAffilaiteEnabled: checkUnleashToggle(name: "T2394_affiliate")
        ...affiliateFragment
      }
    }
  }

  ${affiliateFragment}
`;
