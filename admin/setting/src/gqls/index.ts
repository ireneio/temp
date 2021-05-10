// import
import gql from 'graphql-tag';

// graphql import
import {
  userUserFragment,
  userAuthorityListFragment,
} from '@admin/apollo/lib/gqls/user';

import { useItemsFragment } from './useItems';

// definition
export const getViewerPermission = gql`
  query getViewerPermission {
    viewer {
      id
      role
      permission @client {
        store {
          ...useItemsFragment
        }
      }
      ...userUserFragment
    }

    getAuthorityList {
      ...userAuthorityListFragment
    }
  }

  ${userUserFragment}
  ${userAuthorityListFragment}
  ${useItemsFragment}
`;
