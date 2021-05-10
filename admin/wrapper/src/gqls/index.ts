// import
import gql from 'graphql-tag';

// graphql import
import {
  userUserFragment,
  userAuthorityListFragment,
} from '@admin/apollo/lib/gqls/user';

import { useCheckingAdminStatusFragment } from './useCheckingAdminStatus';
import { useMenuListFragment } from './useMenuList';
import { useFooterMenuListFragment } from './useFooterMenuList';

// definition
export const storeMetaDataFragment = gql`
  fragment storeMetaDataFragment on StoreMetaData {
    accountType
    trialExpireAt
  }
`;

export const initAdmin = gql`
  query initAdmin {
    viewer {
      id
      role
      groupId
      store {
        id
        metaData {
          ...storeMetaDataFragment
        }
        ...useCheckingAdminStatusFragment
        ...useFooterMenuListFragment
      }
      permission @client {
        ...useMenuListFragment
      }
      ...userUserFragment
    }

    getAuthorityList {
      ...userAuthorityListFragment
    }
  }

  ${userUserFragment}
  ${userAuthorityListFragment}

  ${storeMetaDataFragment}
  ${useCheckingAdminStatusFragment}
  ${useMenuListFragment}
  ${useFooterMenuListFragment}
`;
