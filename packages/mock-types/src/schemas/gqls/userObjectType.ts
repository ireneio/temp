// import
import gql from 'graphql-tag';

// definition
export const userObjectTypeMockFragment = gql`
  fragment userObjectTypeMockFragment on userObjectType {
    name
    email
    mobile
  }
`;
