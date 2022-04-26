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
        ...affiliateFragment
        isOpenApiEnabled: checkUnleashToggle(name: "T10564_openApi")
      }
      ...openApiFragment
    }
  }

  ${affiliateFragment}
  ${openApiFragment}
`;
