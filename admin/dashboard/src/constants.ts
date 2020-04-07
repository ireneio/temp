import {
  ShopSettingOutlineIcon,
  PageDesignOutlineIcon,
  ProductManageOutlineIcon,
  CashFlowOutlineIcon,
  ShippingOutlineIcon,
  CustomPageFilledIcon,
  OnePageStoreFilledIcon,
  VirtualPaymentFilledIcon,
  CreditCardFilledIcon,
  PayAfterFilledIcon,
  HomeDeliveryFilledIcon,
  ConvinienceStoreFilledIcon,
  CustomShippingFilledIcon,
} from '@meepshop/icons';

export const TUTORIAL = [
  {
    key: 'store',
    link: '/setting/store-setting',
    Icon: ShopSettingOutlineIcon,
  },
  {
    key: 'page',
    items: [CustomPageFilledIcon, OnePageStoreFilledIcon],
    link: '/page-manager',
    Icon: PageDesignOutlineIcon,
  },
  {
    key: 'product',
    link: '/products',
    Icon: ProductManageOutlineIcon,
  },
  {
    key: 'payment',
    items: [VirtualPaymentFilledIcon, CreditCardFilledIcon, PayAfterFilledIcon],
    link: '/payments',
    Icon: CashFlowOutlineIcon,
  },
  {
    key: 'shipment',
    items: [
      HomeDeliveryFilledIcon,
      ConvinienceStoreFilledIcon,
      CustomShippingFilledIcon,
    ],
    link: '/shippings',
    Icon: ShippingOutlineIcon,
  },
];
