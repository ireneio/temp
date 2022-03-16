// import
import { gql } from '@apollo/client';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { useInitialValuesInCheckoutFragment } from './useInitialValues';
import { loginFragment } from './login';
import { userFragment } from './user';
import {
  receiverStoreFragment,
  receiverInCheckoutUserFragment,
} from './receiver';

// definition
export const getViewerData = gql`
  query getViewerData {
    viewer {
      id
      role
      store {
        hiddingMeepshopMaxInFooterEnabled: checkUnleashToggle(
          name: "storeCnameIsolationlistForHiddingMeepshopMaxInFooter_Enabled"
        )
        ...loginFragment
        ...userFragment
        ...receiverStoreFragment
      }
      ...useInitialValuesInCheckoutFragment
      ...receiverInCheckoutUserFragment
      ...useCartFragment
    }
  }

  ${useInitialValuesInCheckoutFragment}
  ${loginFragment}
  ${userFragment}
  ${receiverStoreFragment}
  ${receiverInCheckoutUserFragment}
  ${useCartFragment}
`;
