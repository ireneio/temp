// import
import { gql } from '@apollo/client';

// graphql import
import { affiliateFragment } from './affiliate';
import { openApiFragment } from './openApi';

// definition
export const getFeatureSubscriptions = gql`
  query getFeatureSubscriptions {
    viewer {
      id
      store {
        id
        isAffilaiteEnabled: checkUnleashToggle(name: "T2394_affiliate")
        ...affiliateFragment
        isOpenApiEnabled: checkUnleashToggle(name: "T10564_openApi")
      }
      ...openApiFragment
    }
  }

  ${affiliateFragment}
  ${openApiFragment}
`;
