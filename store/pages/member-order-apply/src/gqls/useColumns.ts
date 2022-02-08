// import
import { gql } from '@apollo/client';

// graphql import
import { availableProductsForApplyOrderFragment } from '@store/apollo/lib/gqls/productsObjectType';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
// FIXME: T10507
export const useColumnsOrderProductAvailableForApplyMemberOrderApplyFragment = gql`
  fragment useColumnsOrderProductAvailableForApplyMemberOrderApplyFragment on OrderProductAvailableForApply {
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
      ...useColumnsOrderProductAvailableForApplyMemberOrderApplyFragment
    }
    products {
      id
      ...useColumnsProductsObjectTypeMemberOrderApplyFragment
    }
    ...availableProductsForApplyOrderFragment
  }

  ${useColumnsOrderProductAvailableForApplyMemberOrderApplyFragment}
  ${useColumnsProductsObjectTypeMemberOrderApplyFragment}
  ${availableProductsForApplyOrderFragment}
`;
