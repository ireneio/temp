// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment imageFragment on ImageModule {
    id
    image {
      id
      scaledSrc {
        w60
        w120
        w240
        w480
        w720
        w960
        w1200
        w1440
        w1680
        w1920
      }
    }
    link {
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
    width
    justifyContent
    alt
  }
`;
