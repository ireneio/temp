// import
import { gql } from '@apollo/client';

// definition
export const prefixIconStoreFragment = gql`
  fragment prefixIconStoreFragment on Store {
    id
    defaultHomePage {
      id
    }
    defaultProductTemplatePage {
      id
    }
  }
`;

export const prefixIconPageFragment = gql`
  fragment prefixIconPageFragment on Page {
    id
    isDefaultHomePage @client
    isDefaultProductTemplatePage @client
  }
`;
