// import
import gql from 'graphql-tag';

// definition
export const imageScaledURLsFragment = gql`
  fragment imageScaledURLsFragment on ScaledURLs {
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
`;

export const imageImageFragment = gql`
  fragment imageImageFragment on Image {
    id
    scaledSrc {
      ...imageScaledURLsFragment
    }
  }

  ${imageScaledURLsFragment}
`;

export const imageLinkFragment = gql`
  fragment imageLinkFragment on Link {
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

export default gql`
  fragment imageFragment on ImageModule {
    id
    image {
      ...imageImageFragment
    }
    link {
      ...imageLinkFragment
    }
    width
    justifyContent
    alt
  }

  ${imageImageFragment}
  ${imageLinkFragment}
`;
