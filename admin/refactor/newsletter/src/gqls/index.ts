// import
import { gql } from '@apollo/client';

// definition
const newsLetterFragment = gql`
  fragment newsLetterFragment on NewsLetter {
    id
    status
    subject
    template
    toUsers {
      from
      filter {
        and {
          field
          query
          type
        }
      }
    }
    sentAt
    totalUsers
  }
`;

export const getNewsletter = gql`
  query getNewsletter(
    $isNew: Boolean!
    $id: ID
    $search: searchInputObjectType
  ) {
    getNewsLetterList(search: $search)
      @connection(key: "newsLetter")
      @include(if: $isNew) {
      data {
        ...newsLetterFragment
      }
    }

    viewer @skip(if: $isNew) {
      id
      store {
        id
        edm(id: $id) {
          id
          ...newsLetterFragment
        }
      }
    }
  }

  ${newsLetterFragment}
`;
