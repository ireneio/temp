// import
import gql from 'graphql-tag';
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { LinkMock } from './__generated__/LinkMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment LinkMock on Link {
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

export default mock.add<LinkMock>('Link', [
  () =>
    ({
      __typename: 'EmailLink',
      email: 'bella@meepshop.com',
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as LinkMock),
  () =>
    ({
      __typename: 'PhoneLink',
      phone: '0912123123',
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as LinkMock),
  () =>
    ({
      __typename: 'GroupLink',
      group: {
        id: 'group',
      },
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as LinkMock),
  () =>
    ({
      __typename: 'PageLink',
      page: {
        id: 'page',
      },
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as LinkMock),
  () =>
    ({
      __typename: 'ProductLink',
      product: {
        id: uuid(),
      },
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as LinkMock),
  () =>
    ({
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
    } as LinkMock),
  () =>
    ({
      __typename: 'CustomLink',
      href: 'https://bellatest.stage.meepcloud.com',
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as LinkMock),
]);
