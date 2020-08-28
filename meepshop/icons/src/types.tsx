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
export const ConvinienceStoreFilledIcon = MockIcon;
export const CreditCardFilledIcon = MockIcon;
export const CustomPageFilledIcon = MockIcon;
export const CustomShippingFilledIcon = MockIcon;
export const HomeDeliveryFilledIcon = MockIcon;
export const OnePageStoreFilledIcon = MockIcon;
export const PayAfterFilledIcon = MockIcon;
export const VirtualPaymentFilledIcon = MockIcon;
export const AccountIcon = MockIcon;
export const BarChartIcon = MockIcon;
export const BillingIcon = MockIcon;
export const DoubleRightIcon = MockIcon;
export const FolderIcon = MockIcon;
export const ForwardStoreIcon = MockIcon;
export const HamburgerIcon = MockIcon;
export const HomeIcon = MockIcon;
export const LeftIcon = MockIcon;
export const LogoutIcon = MockIcon;
export const MarketingIcon = MockIcon;
export const MessageCircleIcon = MockIcon;
export const MoreIcon = MockIcon;
export const OrderIcon = MockIcon;
export const PackageIcon = MockIcon;
export const SettingIcon = MockIcon;
export const StoreIcon = MockIcon;
export const UsersIcon = MockIcon;
export const AppStoreOutlineIcon = MockIcon;
export const AuthorizationOutlineIcon = MockIcon;
export const ExportOutlineIcon = MockIcon;
export const NotificationOutlineIcon = MockIcon;
export const PaymentsOutlineIcon = MockIcon;
export const ShippingOutlineIcon = MockIcon;
export const ShopOutlineIcon = MockIcon;
export const ShoppingOutlineIcon = MockIcon;
export const ThirdPartyOutlineIcon = MockIcon;
export const AnalyticsSettingIcon = MockIcon;
export const ViewReplyIcon = MockIcon;
