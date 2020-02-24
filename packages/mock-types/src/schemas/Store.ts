// import
import gql from 'graphql-tag';

import mock from '../mock';

import getLocale from './utils/getLocale';

// graphql typescript
import { StoreMock } from './__generated__/StoreMock';

// graphql import
import localeFragment from './fragments/locale';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment StoreMock on Store {
    domain
    currency
    unpaidBills {
      totalCount
    }

    defaultHomePage {
      id
      pageType
      title {
        ...localeFragment
      }
    }

    defaultProductListPage {
      id
      pageType
      title {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;

export default mock.add<StoreMock>('Store', [
  () => ({
    __typename: 'Store',
    domain: null,
    currency: null,
    unpaidBills: {
      __typename: 'StoreUnpaidBills',
      totalCount: 5,
    },
    defaultHomePage: {
      __typename: 'Page',
      id: 'home-page-id',
      pageType: 'home',
      title: getLocale('home-page-id'),
    },
    defaultProductListPage: {
      __typename: 'Page',
      id: 'default-product-list-page-id',
      pageType: 'products',
      title: getLocale('default-product-list-page-id'),
    },
  }),
  () => ({
    __typename: 'Store',
    domain: ['localhost:14401'],
    currency: 'TWD',
    unpaidBills: {
      __typename: 'StoreUnpaidBills',
      totalCount: 5,
    },
    defaultHomePage: {
      __typename: 'Page',
      id: 'home-page-id',
      pageType: 'home',
      title: getLocale('home-page-id'),
    },
    defaultProductListPage: {
      __typename: 'Page',
      id: 'default-product-list-page-id',
      pageType: 'products',
      title: getLocale('default-product-list-page-id'),
    },
  }),
]);
