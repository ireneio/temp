// import
import gql from 'graphql-tag';

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
