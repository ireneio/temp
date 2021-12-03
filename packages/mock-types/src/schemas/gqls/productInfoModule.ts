// import
import { gql } from '@apollo/client';

// definition
export const productInfoModuleMockFragment = gql`
  fragment productInfoModuleMockFragment on ProductInfoModule {
    drawerOnMobile
    unfoldedVariantsOnMobile
    unfoldedVariants
  }
`;
