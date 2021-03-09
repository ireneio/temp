// import
import gql from 'graphql-tag';

// definition
export const productInfoModuleMockFragment = gql`
  fragment productInfoModuleMockFragment on ProductInfoModule {
    drawerOnMobile
    unfoldedVariantsOnMobile
    unfoldedVariants
  }
`;
