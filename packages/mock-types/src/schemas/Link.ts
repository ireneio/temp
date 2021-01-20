// import
import uuid from 'uuid/v4';

import mock from '../mock';

// graphql typescript
import { ProductsSort, linkMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<linkMockFragment>('Link', [
  () => ({
    __typename: 'EmailLink',
    email: 'bella@meepshop.com',
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  }),
  () => ({
    __typename: 'PhoneLink',
    phone: '0912123123',
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  }),
  () => ({
    __typename: 'GroupLink',
    group: {
      __typename: 'GroupModule',
      id: 'group',
    },
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  }),
  () => ({
    __typename: 'PageLink',
    page: {
      __typename: 'Page',
      id: 'page',
    },
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  }),
  () => ({
    __typename: 'ProductLink',
    product: {
      __typename: 'Product',
      id: uuid(),
    },
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  }),
  () => ({
    __typename: 'ProductsLink',
    sort: 'LATEST' as ProductsSort,
    searchKey: 'searchKey',
    retailPriceRange: {
      __typename: 'MinMaxFloatRange',
      min: 0,
      max: 100,
    },
    tags: ['tag1', 'tag2'],
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  }),
  () => ({
    __typename: 'CustomLink',
    href: 'https://bellatest.stage.meepcloud.com',
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  }),
]);
