// import
import { gql } from '@apollo/client';

// definition
export const useLinkFragment = gql`
  fragment useLinkFragment on Link {
    ... on EmailLink {
      __typename
      email
      newWindow
      tracking {
        name
        category
      }
    }

    ... on PhoneLink {
      __typename
      phone
      newWindow
      tracking {
        name
        category
      }
    }

    ... on GroupLink {
      __typename
      group {
        id
      }
      newWindow
      tracking {
        name
        category
      }
    }

    ... on HomeLink {
      __typename
      newWindow
      tracking {
        name
        category
      }
    }

    ... on PageLink {
      __typename
      page {
        id
      }
      newWindow
      tracking {
        name
        category
      }
    }

    ... on ProductLink {
      __typename
      product {
        id
      }
      newWindow
      tracking {
        name
        category
      }
    }

    ... on ProductsLink {
      __typename
      sort
      searchKey
      retailPriceRange {
        min
        max
      }
      tags
      newWindow
      tracking {
        name
        category
      }
    }

    ... on CustomLink {
      __typename
      href
      newWindow
      tracking {
        name
        category
      }
    }
  }
`;
