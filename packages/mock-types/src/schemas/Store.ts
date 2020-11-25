// import
import mock from '../mock';

// graphql typescript
import { storeMockFragment } from './gqls/__generated__/storeMockFragment';

// definition
export default mock.add<storeMockFragment>('Store', [
  () =>
    ({
      __typename: 'Store',
      adminStatus: 'BILL_NOT_PAID',
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
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'home-page-id',
        },
      },
      defaultProductListPage: {
        __typename: 'Page',
        id: 'default-product-list-page-id',
        pageType: 'products',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'default-product-list-page-id',
        },
      },
      logoImage: {
        __typename: 'Image',
      },
      mobileLogoImage: {
        __typename: 'Image',
      },
    } as storeMockFragment),
  () =>
    ({
      __typename: 'Store',
      adminStatus: 'OPEN',
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
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'home-page-id',
        },
      },
      defaultProductListPage: {
        __typename: 'Page',
        id: 'default-product-list-page-id',
        pageType: 'products',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'default-product-list-page-id',
        },
      },
      logoImage: null,
      mobileLogoImage: null,
    } as storeMockFragment),
]);
