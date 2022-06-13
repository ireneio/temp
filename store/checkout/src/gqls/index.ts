// import
import { gql } from '@apollo/client';

// graphql import
import { useInitialValuesInCheckoutFragment } from './useInitialValues';
import { loginFragment } from './login';
import { userFragment } from './user';
import {
  receiverStoreFragment,
  receiverInCheckoutUserFragment,
} from './receiver';
import { recipientCommentFragment } from './recipientComment';
import { useSaveUserFragment } from './useSave';

// definition
export const getViewerData = gql`
  query getViewerData($first: PositiveInt!) {
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
        setting {
          order {
            recipientComment {
              ...recipientCommentFragment
            }
          }
        }
      }
      ...useInitialValuesInCheckoutFragment
      ...receiverInCheckoutUserFragment
      ...useSaveUserFragment
    }
  }

  ${useInitialValuesInCheckoutFragment}
  ${loginFragment}
  ${userFragment}
  ${receiverStoreFragment}
  ${receiverInCheckoutUserFragment}
  ${useSaveUserFragment}
  ${recipientCommentFragment}
`;
