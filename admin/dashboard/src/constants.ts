import {
  StoreIcon,
  PageIcon,
  ProductIcon,
  PaymentIcon,
  ShipmentIcon,
  CustomPageIcon,
  OnePageStoreIcon,
  VirtualPaymentIcon,
  CreditCardIcon,
  PayAfterIcon,
  HomeDeliveryIcon,
  ConvinienceStoreIcon,
  CustomShippingIcon,
} from '@meepshop/icons';

export const TUTORIAL = [
  {
    key: 'store',
    link: '/setting/store-setting',
    Icon: StoreIcon,
  },
  {
    key: 'page',
    items: [CustomPageIcon, OnePageStoreIcon],
    link: '/page-manager',
    Icon: PageIcon,
  },
  {
    key: 'product',
    link: '/products',
    Icon: ProductIcon,
  },
  {
    key: 'payment',
    items: [VirtualPaymentIcon, CreditCardIcon, PayAfterIcon],
    link: '/payments',
    Icon: PaymentIcon,
  },
  {
    key: 'shipment',
    items: [HomeDeliveryIcon, ConvinienceStoreIcon, CustomShippingIcon],
    link: '/shippings',
    Icon: ShipmentIcon,
  },
];
