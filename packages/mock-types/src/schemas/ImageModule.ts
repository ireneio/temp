// import
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { ImageModuleMock } from './__generated__/ImageModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment ImageModuleMock on ImageModule {
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

export default mock.add<ImageModuleMock>('ImageModule', [
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: null,
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: {
        __typename: 'EmailLink',
        email: 'bella@meepshop.com',
        newWindow: true,
        tracking: {
          name: 'tracking',
          category: null,
        },
      },
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: {
        __typename: 'PhoneLink',
        phone: '0912123123',
        newWindow: true,
        tracking: {
          name: 'tracking',
          category: null,
        },
      },
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: {
        __typename: 'GroupLink',
        group: {
          id: 'group',
        },
        newWindow: true,
        tracking: {
          name: 'tracking',
          category: null,
        },
      },
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: {
        __typename: 'PageLink',
        page: {
          id: 'page',
        },
        newWindow: true,
        tracking: {
          name: 'tracking',
          category: null,
        },
      },
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: {
        __typename: 'ProductLink',
        product: {
          id: uuid(),
        },
        newWindow: true,
        tracking: {
          name: 'tracking',
          category: null,
        },
      },
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: {
        __typename: 'ProductsLink',
        sort: 'LATEST',
        searchKey: 'searchKey',
        minPrice: 0,
        maxPrice: 100,
        tags: ['tag1', 'tag2'],
        newWindow: true,
        tracking: {
          name: 'tracking',
          category: null,
        },
      },
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
  () =>
    ({
      __typename: 'ImageModule',
      image: null,
      link: {
        __typename: 'CustomLink',
        href: 'https://bellatest.stage.meepcloud.com',
        newWindow: true,
        tracking: {
          name: 'tracking',
          category: null,
        },
      },
      width: 100,
      justifyContent: 'FLEX_START',
      alt: 'alt',
    } as ImageModuleMock),
]);
