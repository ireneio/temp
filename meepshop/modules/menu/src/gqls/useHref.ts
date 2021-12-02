// import
import { gql } from '@apollo/client';

// definition
export const useHrefUserFragment = gql`
  fragment useHrefUserFragment on User {
    id
    role
  }
`;

export const useHrefMenuPageObjectTypeFragment = gql`
  fragment useHrefMenuPageObjectTypeFragment on MenuPageObjectType {
    id
    action
    params {
      pageId
      path
      url
      offset: from
      limit: size
      search: query_string
      sort {
        order
      }
      price {
        lte
        gte
      }
      tags
    }
  }
`;
