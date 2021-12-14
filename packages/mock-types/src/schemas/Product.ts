// import
import mock from '../mock';

// graphql typescript
import { productMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<
  productMockFragment,
  {
    node: { id: string };
  }
>('Product', [
  obj => ({
    __typename: 'Product',
    id: obj?.node?.id || 'product id',
    status: 1,
    title: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW:
        'POPRORO 新品上架｜蓬蓬夾 讓髮根立正站好 五分鐘捲髮出門 K.O.髮根扁塌困擾，打造小臉有神的妳（兩件95折）1',
    },
    specs: [
      {
        __typename: 'SpecDefinition',
        id: '02640c45-c854-4773-b654-5ae63604b803',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec1',
        },
      },
      {
        __typename: 'SpecDefinition',
        id: 'ff13bf7c-526f-413a-b8f3-ef256bd06370',
        title: {
          __typename: 'Locale',
          // eslint-disable-next-line @typescript-eslint/camelcase
          zh_TW: 'spec2',
        },
      },
    ],
    variants: [
      {
        __typename: 'Variant',
        id: 'variant id',
        sku: '1111-232061',
        stock: 99,
        retailPrice: 36000,
        specs: [
          {
            __typename: 'SpecValue',
            id: 'spec id',
            specId: '02640c45-c854-4773-b654-5ae63604b803',
            title: {
              __typename: 'Locale',
              // eslint-disable-next-line @typescript-eslint/camelcase
              zh_TW: 'A',
            },
          },
          {
            __typename: 'SpecValue',
            id: 'spec id 2',
            specId: 'ff13bf7c-526f-413a-b8f3-ef256bd06370',
            title: {
              __typename: 'Locale',
              // eslint-disable-next-line @typescript-eslint/camelcase
              zh_TW: 'B',
            },
          },
        ],
      },
    ],
  }),
  obj => ({
    __typename: 'Product',
    id: obj?.node?.id || 'product id',
    status: 1,
    title: {
      __typename: 'Locale',
      // eslint-disable-next-line @typescript-eslint/camelcase
      zh_TW:
        'POPRORO 新品上架｜蓬蓬夾 讓髮根立正站好 五分鐘捲髮出門 K.O.髮根扁塌困擾，打造小臉有神的妳（兩件95折）',
    },
    specs: null,
    variants: [
      {
        __typename: 'Variant',
        id: 'variant id',
        sku: null,
        stock: 99,
        retailPrice: 36000,
        specs: null,
      },
    ],
  }),
]);
