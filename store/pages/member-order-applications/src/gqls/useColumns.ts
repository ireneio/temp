// import
import gql from 'graphql-tag';

// graphql import
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useColumnsOrderApplyFragment = gql`
  fragment useColumnsOrderApplyFragment on OrderApply {
    id
    quantity
    applicationType
    applicationStatus
    status
    applicationInfo {
      comment
    }
  }
`;

export const useColumnsProductsObjectTypeFragment = gql`
  fragment useColumnsProductsObjectTypeFragment on productsObjectType {
    id
    coverImage {
      id
      ...thumbnailFragment
    }
    title {
      ...localeFragment
    }
    specs {
      title {
        ...localeFragment
      }
    }
  }

  ${thumbnailFragment}
  ${localeFragment}
`;

export const useColumnsMemberOrderApplicationsFragment = gql`
  fragment useColumnsMemberOrderApplicationsFragment on Order {
    id
    applications @client {
      id
      extra {
        id
        ...useColumnsOrderApplyFragment
        product {
          id
          ...useColumnsProductsObjectTypeFragment
        }
      }
    }
  }

  ${useColumnsOrderApplyFragment}
  ${useColumnsProductsObjectTypeFragment}
`;
