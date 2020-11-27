// import
import uuid from 'uuid/v4';

import { languages } from '@meepshop/utils/lib/i18n';
import { dashboardCost_scaledSrc as dashboardCost } from '@meepshop/images';

// graphql typescript
import { ImagePositionEnum } from '../../__generated__/meepshop';
import { menuMenuModuleFragment } from './src/gqls/__generated__/menuMenuModuleFragment';

// definition
const ACTIONS: number[] = [].constructor
  .apply({}, new Array(9))
  .map((_: unknown, index: number) => index)
  .filter((index: number) => index !== 4);

const IMAGES = ['ONLY', 'UPON', 'LEFT', 'RIGHT', null, 'BELOW'].map(
  (imagePosition: ImagePositionEnum) => ({
    image: {
      __typename: 'Image' as 'Image',
      id: uuid(),
      scaledSrc: {
        ...dashboardCost,
        __typename: 'ScaledURLs' as 'ScaledURLs',
      },
    },
    imagePosition,
  }),
);

const generateMenuPages = (
  pages: NonNullable<menuMenuModuleFragment['menu']>['pages'] = null,
): NonNullable<menuMenuModuleFragment['menu']>['pages'] =>
  ACTIONS.map((action: number) => ({
    ...(IMAGES[action] || { image: null, imagePosition: null }),
    __typename: 'MenuPageObjectType' as 'MenuPageObjectType',
    id: uuid(),
    action,
    title: {
      __typename: 'Locale' as 'Locale',
      /* eslint-disable @typescript-eslint/camelcase */
      zh_TW: `action ${action}`,
      en_US: `action ${action}`,
      ja_JP: `action ${action}`,
      vi_VN: `action ${action}`,
      fr_FR: `action ${action}`,
      es_ES: `action ${action}`,
      th_TH: `action ${action}`,
      id_ID: `action ${action}`,
      /* eslint-enable @typescript-eslint/camelcase */
    },
    params: {
      __typename: 'MenuPageParamsObjectType',
      displayMemberGroup: true,
      pageId: 'home',
      path: '',
      url: '/test',
      offset: 0,
      limit: 0,
      search: 'search',
      sort: null,
      price: null,
      tags: null,
    },
    newWindow: true,
    pages,
  }));

export default {
  __typename: 'MenuModule',
  id: uuid(),
  menu: {
    __typename: 'Menu',
    id: uuid(),
    pages: generateMenuPages(generateMenuPages(generateMenuPages())),
    design: {
      __typename: 'MenuDesignObjectType',
      iconSize: 24,
      showSearchbar: true,
    },
  },
  cart: {
    __typename: 'OrderList',
    data: [
      {
        __typename: 'Order',
        id: uuid(),
        categories: [
          {
            __typename: 'groupProductsObjectType',
            id: uuid(),
            products: [
              {
                __typename: 'productsObjectType',
                id: uuid(),
                type: 'gift',
                quantity: 10,
              },
              {
                __typename: 'productsObjectType',
                id: uuid(),
                type: 'product',
                quantity: 3,
              },
              {
                __typename: 'productsObjectType',
                id: uuid(),
                type: 'product',
                quantity: 5,
              },
            ],
          },
        ],
      },
    ],
  },
  viewer: {
    __typename: 'User',
    id: uuid(),
    role: 'SHOPPER',
    memberGroup: {
      __typename: 'MemberGroup',
      id: uuid(),
      name: 'group name',
    },
    store: {
      __typename: 'Store',
      id: uuid(),
      setting: {
        __typename: 'SettingObjectType',
        locale: languages,
        currency: [
          'TWD',
          'USD',
          'CNY',
          'JPY',
          'EUR',
          'VND',
          'KRW',
          'HKD',
          'MYR',
        ],
      },
    },
  },
} as menuMenuModuleFragment;
