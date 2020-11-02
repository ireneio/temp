// import
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { linkMockFragment } from './gqls/__generated__/linkMockFragment';

// definition
export default mock.add<linkMockFragment>('Link', [
  () =>
    ({
      __typename: 'EmailLink',
      email: 'bella@meepshop.com',
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as linkMockFragment),
  () =>
    ({
      __typename: 'PhoneLink',
      phone: '0912123123',
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as linkMockFragment),
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
    } as linkMockFragment),
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
    } as linkMockFragment),
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
    } as linkMockFragment),
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
    } as linkMockFragment),
  () =>
    ({
      __typename: 'CustomLink',
      href: 'https://bellatest.stage.meepcloud.com',
      newWindow: true,
      tracking: {
        name: 'tracking',
        category: null,
      },
    } as linkMockFragment),
]);
