// typescript import
import { IconProps, CustomIconComponentProps } from 'antd/lib/icon';

// import
import React from 'react';
import { Icon } from 'antd';

// definition
// Only for typescript, do not import
const Component = React.memo((props: CustomIconComponentProps) => (
  <svg {...props} viewBox="64 64 896 896" />
));

const MockIcon = React.memo((props: IconProps) => (
  <Icon {...props} component={Component} />
));

export const HomePageIcon = MockIcon;
export const DefaultLayoutIcon = MockIcon;
export const PageDesignOutlineIcon = MockIcon;
export const CashFlowOutlineIcon = MockIcon;
export const ProductManageOutlineIcon = MockIcon;
export const ShippingOutlineIcon = MockIcon;
export const ShopSettingOutlineIcon = MockIcon;
export const ConvinienceStoreFilledIcon = MockIcon;
export const CreditCardFilledIcon = MockIcon;
export const CustomPageFilledIcon = MockIcon;
export const CustomShippingFilledIcon = MockIcon;
export const HomeDeliveryFilledIcon = MockIcon;
export const OnePageStoreFilledIcon = MockIcon;
export const PayAfterFilledIcon = MockIcon;
export const VirtualPaymentFilledIcon = MockIcon;
