// import
import gql from 'graphql-tag';

// graphql import
import {
  descriptionProductFragment,
  descriptionVariantFragment,
  descriptionUserFragment,
} from './description';

// definition
export const productInfoFragment = gql`
  fragment productInfoFragment on ProductInfoModule {
    id
    drawerOnMobile
    unfoldedVariantsOnMobile
    unfoldedVariants
    product {
      ...descriptionProductFragment
      id
      variants {
        ...descriptionVariantFragment
        id
      }
    }
    viewer {
      ...descriptionUserFragment
      id
    }
  }

  ${descriptionProductFragment}
  ${descriptionVariantFragment}
  ${descriptionUserFragment}
`;
