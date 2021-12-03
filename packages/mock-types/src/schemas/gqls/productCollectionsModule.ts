// import
import { gql } from '@apollo/client';

// definition
export const productCollectionsModuleMockFragment = gql`
  fragment productCollectionsModuleMockFragment on ProductCollectionsModule {
    productCollectionsType
    percentWidth
  }
`;
