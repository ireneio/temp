// import
import { gql } from '@apollo/client';

// definition
export const userObjectTypeMockFragment = gql`
  fragment userObjectTypeMockFragment on userObjectType {
    name
    email
    mobile
  }
`;
