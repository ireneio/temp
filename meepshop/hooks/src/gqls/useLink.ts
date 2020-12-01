// import
import gql from 'graphql-tag';

// definition
export const useLinkFragment = gql`
  fragment useLinkFragment on Link {
    ... on EmailLink {
      email
      newWindow
      tracking {
        name
        category
      }
    }

    ... on PhoneLink {
      phone
      newWindow
      tracking {
        name
        category
      }
    }

    ... on GroupLink {
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
      newWindow
      tracking {
        name
        category
      }
    }

    ... on PageLink {
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
      href
      newWindow
      tracking {
        name
        category
      }
    }
  }
`;
