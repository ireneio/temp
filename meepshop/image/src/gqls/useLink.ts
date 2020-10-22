// import
import gql from 'graphql-tag';

// definition
export default gql`
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
      minPrice
      maxPrice
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
