// import
import { gql } from '@apollo/client';

// definition
export const productDraftTextProductFragment = gql`
  fragment productDraftTextProductFragment on Product {
    id
    draftText {
      value
    }
  }
`;

export const productDraftTextProductDraftTextModuleFragment = gql`
  fragment productDraftTextProductDraftTextModuleFragment on ProductDraftTextModule {
    id
    product {
      id
      ...productDraftTextProductFragment
    }
  }

  ${productDraftTextProductFragment}
`;
