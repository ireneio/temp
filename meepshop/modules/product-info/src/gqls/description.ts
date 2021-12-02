// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const descriptionProductFragment = gql`
  fragment descriptionProductFragment on Product {
    id
    title {
      ...localeFragment
    }
    description {
      ...localeFragment
    }
    applicableActivities {
      id
      title {
        ...localeFragment
      }
      discountPrice
    }
    showUserPrice {
      showListPrice
      showSuggestedPrice
    }
  }

  ${localeFragment}
`;

export const descriptionVariantFragment = gql`
  fragment descriptionVariantFragment on Variant {
    id
    sku
    listPrice
    suggestedPrice
    totalPrice
  }
`;

export const descriptionUserFragment = gql`
  fragment descriptionUserFragment on User {
    id
    role
  }
`;
