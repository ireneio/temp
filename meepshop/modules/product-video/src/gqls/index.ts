// import
import { gql } from '@apollo/client';

// definition
export const productVideoProductFragment = gql`
  fragment productVideoProductFragment on Product {
    id
    videoLink {
      value
    }
  }
`;

export const productVideoProductVideoModuleFragment = gql`
  fragment productVideoProductVideoModuleFragment on ProductVideoModule {
    id
    width
    ratio
    product {
      id
      ...productVideoProductFragment
    }
  }

  ${productVideoProductFragment}
`;
