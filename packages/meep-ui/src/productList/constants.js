import PropTypes from 'prop-types';
import { ID_TYPE, LOCALE_TYPE } from 'constants/propTypes';
import uuid from 'uuid/v4';

import BagIcon from './icons/BagIcon';
import SuitIcon from './icons/SuitIcon';
import BeltIcon from './icons/BeltIcon';
import BootIcon from './icons/BootIcon';
import WatchIcon from './icons/WatchIcon';
import HatIcon from './icons/HatIcon';

export const VARIANT_TYPE = PropTypes.shape({
  id: ID_TYPE.isRequired,
  maxPurchaseLimit: PropTypes.number.isRequired,
  minPurchaseItems: PropTypes.number.isRequired,
  listPrice: PropTypes.number,
  suggestedPrice: PropTypes.number,
  retailPrice: PropTypes.number.isRequired,
  discountPrice: PropTypes.number,
  totalPrice: PropTypes.number.isRequired,
  sku: PropTypes.string.isRequired,
});

export const PRODUCT_TYPE = PropTypes.shape({
  id: ID_TYPE.isRequired,
  specs: PropTypes.arrayOf(
    PropTypes.shape({
      id: ID_TYPE.isRequired,
      title: LOCALE_TYPE,
    }).isRequired,
  ),
  description: LOCALE_TYPE.isRequired,
  status: PropTypes.oneOf([0, 1]).isRequired,
  title: LOCALE_TYPE.isRequired,
  variants: PropTypes.arrayOf(VARIANT_TYPE.isRequired).isRequired,
  showUserPrice: PropTypes.shape({
    showListPrice: PropTypes.bool.isRequired,
    showSuggestedPrice: PropTypes.bool.isRequired,
  }),
});

export const SORT_OPTIONS = (ids, value) => [
  ...(ids
    ? [
        {
          text: 'selections',
          value: 'selections',
        },
      ]
    : []),
  ...(value === 'createdOn-asc'
    ? [
        {
          text: 'oldest',
          value,
        },
      ]
    : []),
  {
    text: 'latest',
    value: 'createdOn-desc',
  },
  {
    text: 'title',
    value: 'title.zh_TW-asc',
  },
  {
    text: 'price-asc',
    value: 'variantInfo.firstRetailPrice-asc',
  },
  {
    text: 'price-desc',
    value: 'variantInfo.firstRetailPrice-desc',
  },
];

export const DEFAULT_PRODUCTS = {
  data: [
    {
      id: uuid(),
      coverImage: BagIcon,
      title: { en_US: '', zh_TW: '商品範例' },
      description: {
        en_US: '',
        zh_TW: '新增商品時，如有寫下商品描述，會在此顯示',
      },
      variants: [
        {
          totalPrice: 2690,
          listPrice: 2690,
          suggestedPrice: 2690,
          stock: 1,
        },
      ],
    },
    {
      id: uuid(),
      coverImage: SuitIcon,
      title: { en_US: '', zh_TW: '商品範例' },
      description: {
        en_US: '',
        zh_TW: '新增商品時，如有寫下商品描述，會在此顯示',
      },
      variants: [
        {
          totalPrice: 1200,
          listPrice: 1200,
          suggestedPrice: 1200,
          stock: 1,
        },
      ],
    },
    {
      id: uuid(),
      coverImage: BeltIcon,
      title: { en_US: '', zh_TW: '商品範例' },
      description: {
        en_US: '',
        zh_TW: '新增商品時，如有寫下商品描述，會在此顯示',
      },
      variants: [
        {
          totalPrice: 2800,
          listPrice: 2800,
          suggestedPrice: 2800,
          stock: 1,
        },
      ],
    },
    {
      id: uuid(),
      coverImage: BootIcon,
      title: { en_US: '', zh_TW: '商品範例' },
      description: {
        en_US: '',
        zh_TW: '新增商品時，如有寫下商品描述，會在此顯示',
      },
      variants: [
        {
          totalPrice: 2580,
          listPrice: 2580,
          suggestedPrice: 2580,
          stock: 1,
        },
      ],
    },
    {
      id: uuid(),
      coverImage: WatchIcon,
      title: { en_US: '', zh_TW: '商品範例' },
      description: {
        en_US: '',
        zh_TW: '新增商品時，如有寫下商品描述，會在此顯示',
      },
      variants: [
        {
          totalPrice: 1790,
          listPrice: 1790,
          suggestedPrice: 1790,
          stock: 1,
        },
      ],
    },
    {
      id: uuid(),
      coverImage: HatIcon,
      title: { en_US: '', zh_TW: '商品範例' },
      description: {
        en_US: '',
        zh_TW: '新增商品時，如有寫下商品描述，會在此顯示',
      },
      variants: [
        {
          totalPrice: 2500,
          listPrice: 2500,
          suggestedPrice: 2500,
          stock: 1,
        },
      ],
    },
  ],
  total: 6,
};
