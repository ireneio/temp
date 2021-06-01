// import
import gql from 'graphql-tag';

// graphql import
import { availableProductsForApplyOrderFragment } from '@store/apollo/lib/gqls/productsObjectType';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useColumnsProductsObjectTypeMemberOrderApplyFragment = gql`
  fragment useColumnsProductsObjectTypeMemberOrderApplyFragment on productsObjectType {
    id
    retailPrice
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
    availableQuantity @client
  }

  ${thumbnailFragment}
  ${localeFragment}
`;

export const useColumnsOrderMemberOrderApplyFragment = gql`
  fragment useColumnsOrderMemberOrderApplyFragment on Order {
    id
    availableProductsForApply @client {
      id
      ...useColumnsProductsObjectTypeMemberOrderApplyFragment
    }
    products {
      id
      ...useColumnsProductsObjectTypeMemberOrderApplyFragment
    }
    ...availableProductsForApplyOrderFragment
  }

  ${useColumnsProductsObjectTypeMemberOrderApplyFragment}
  ${availableProductsForApplyOrderFragment}
`;
