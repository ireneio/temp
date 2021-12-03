// import
import { gql } from '@apollo/client';

// definition
export const menuPageParamsObjectTypeMockFragment = gql`
  fragment menuPageParamsObjectTypeMockFragment on MenuPageParamsObjectType {
    displayMemberGroup
    pageId
    path
    url
    from
    size
    query_string
    sort {
      order
    }
    price {
      lte
      gte
    }
    tags
  }
`;
