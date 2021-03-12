// import
import uuid from 'uuid/v4';

import { languages } from '@meepshop/locales';
import { dashboardCost_scaledSrc as dashboardCost } from '@meepshop/images';

// graphql typescript
import {
  AlignmentEnum,
  ViewerTypeEnum,
  ImagePositionEnum,
  menuMenuModuleFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
const ACTIONS: number[] = [].constructor
  .apply({}, new Array(9))
  .map((_: unknown, index: number) => index)
  .filter((index: number) => index !== 4);

const IMAGES = ['ONLY', 'UPON', 'LEFT', 'RIGHT', null, 'BELOW'].map(
  (imagePosition: ImagePositionEnum) => ({
    image: {
      __typename: 'Image' as const,
      id: uuid(),
      scaledSrc: {
        ...dashboardCost,
        __typename: 'ScaledURLs' as const,
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
    __typename: 'MenuPageObjectType' as const,
    id: uuid(),
    action,
    title: {
      __typename: 'Locale' as const,
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
      __typename: 'MenuPageParamsObjectType' as const,
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
  __typename: 'MenuModule' as const,
  id: uuid(),
  menu: {
    __typename: 'Menu' as const,
    id: uuid(),
    logoAlignment: 'LEFT' as AlignmentEnum,
    pages: generateMenuPages(generateMenuPages(generateMenuPages())),
    design: {
      __typename: 'MenuDesignObjectType' as const,
      iconSize: 24,
      fontSize: 14,
      showSearchbar: true,
      alignment: 'LEFT',
      expandSubItem: false,
      showLogo: true,
      pattern: 0,
      normal: null,
      active: null,
      hover: null,
      opacity: 1,
      font: '黑體',
    },
  },
  cart: {
    __typename: 'OrderList' as const,
    data: [
      {
        __typename: 'Order' as const,
        id: uuid(),
        categories: [
          {
            __typename: 'groupProductsObjectType' as const,
            id: uuid(),
            products: [
              {
                __typename: 'productsObjectType' as const,
                id: uuid(),
                type: 'gift',
                quantity: 10,
              },
              {
                __typename: 'productsObjectType' as const,
                id: uuid(),
                type: 'product',
                quantity: 3,
              },
              {
                __typename: 'productsObjectType' as const,
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
    __typename: 'User' as const,
    id: uuid(),
    role: 'SHOPPER' as ViewerTypeEnum,
    memberGroup: {
      __typename: 'MemberGroup' as const,
      id: uuid(),
      name: 'group name',
    },
    store: {
      __typename: 'Store' as const,
      id: uuid(),
      setting: {
        __typename: 'SettingObjectType' as const,
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
      logoImage: null,
      mobileLogoImage: null,
    },
  },
};
