// import
import { buildClientSchema } from 'graphql';
import { addMocksToSchema } from '@graphql-tools/mock';
import { getUnixTime, addHours, formatRFC3339 } from 'date-fns';

// Generate by command
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import schemaJSON from '../schema';

import Address from './schemas/Address';
import AddressService from './schemas/AddressService';
import AdminProductsConnection from './schemas/AdminProductsConnection';
import Area from './schemas/Area';
import Authority from './schemas/Authority';
import activeParamsObjectType from './schemas/activeParamsObjectType';
import BackgroundImage from './schemas/BackgroundImage';
import City from './schemas/City';
import ColorList from './schemas/ColorList';
import ConvenienceStore from './schemas/ConvenienceStore';
import Country from './schemas/Country';
import DashboardInfo from './schemas/DashboardInfo';
import DraftTextProductCustomField from './schemas/DraftTextProductCustomField';
import ExchangeRate from './schemas/ExchangeRate';
import ExportFormat from './schemas/ExportFormat';
import ezPaymentReturnListObjectType from './schemas/ezPaymentReturnListObjectType';
import FbPixel from './schemas/FbPixel';
import FetchSmartConversionModuleGADataResponse from './schemas/FetchSmartConversionModuleGADataResponse';
import GMOUserInfo from './schemas/GMOUserInfo';
import GmoBankInstallment from './schemas/GmoBankInstallment';
import groupProductsObjectType from './schemas/groupProductsObjectType';
import gtag from './schemas/gtag';
import HexColorCode from './schemas/HexColorCode';
import hoverParamsObjectType from './schemas/hoverParamsObjectType';
import Icon from './schemas/Icon';
import Image from './schemas/Image';
import Link from './schemas/Link';
import Locale from './schemas/Locale';
import MemberGroup from './schemas/MemberGroup';
import Menu from './schemas/Menu';
import MenuDesignObjectType from './schemas/MenuDesignObjectType';
import MenuPageObjectType from './schemas/MenuPageObjectType';
import MenuPageParamsObjectType from './schemas/MenuPageParamsObjectType';
import NotificationObjectType from './schemas/NotificationObjectType';
import nornalParamsObjectType from './schemas/nornalParamsObjectType';
import Order from './schemas/Order';
import OrderApplyList from './schemas/OrderApplyList';
import OrderAuditLogOperator from './schemas/OrderAuditLogOperator';
import OrderConnection from './schemas/OrderConnection';
import OrderProductQuantityDelta from './schemas/OrderProductQuantityDelta';
import Page from './schemas/Page';
import PageConnection from './schemas/PageConnection';
import PaymentAccountForCathay from './schemas/PaymentAccountForCathay';
import PaymentAccountForEzpay from './schemas/PaymentAccountForEzpay';
import PaymentForAllpay from './schemas/PaymentForAllpay';
import PriceDelta from './schemas/PriceDelta';
import paymentInfoType from './schemas/paymentInfoType';
import paymentObjectType from './schemas/paymentObjectType';
import permissionDesignObj from './schemas/permissionDesignObj';
import permissionFileObj from './schemas/permissionFileObj';
import permissionOrderObj from './schemas/permissionOrderObj';
import permissionProductObj from './schemas/permissionProductObj';
import permissionServiceObj from './schemas/permissionServiceObj';
import permissionStoreObj from './schemas/permissionStoreObj';
import permissionUserObj from './schemas/permissionUserObj';
import priceObjectType from './schemas/priceObjectType';
import Product from './schemas/Product';
import productsObjectType from './schemas/productsObjectType';
import RecipientAddress from './schemas/RecipientAddress';
import RecipientObjectType from './schemas/RecipientObjectType';
import RoutingRule from './schemas/RoutingRule';
import SettingObjectType from './schemas/SettingObjectType';
import SmartConversionModule from './schemas/SmartConversionModule';
import Store from './schemas/Store';
import StoreApp from './schemas/StoreApp';
import StoreEcfitSettings from './schemas/StoreEcfitSettings';
import StorePayment from './schemas/StorePayment';
import StoreShipment from './schemas/StoreShipment';
import shipmentInfoType from './schemas/shipmentInfoType';
import shipmentObjectType from './schemas/shipmentObjectType';
import TagList from './schemas/TagList';
import User from './schemas/User';
import UserMemberGroupObjectType from './schemas/UserMemberGroupObjectType';
import UserPoints from './schemas/UserPoints';
import UserRewardPoint from './schemas/UserRewardPoint';
import userObjectType from './schemas/userObjectType';
import VideoLinkProductCustomField from './schemas/VideoLinkProductCustomField';
import WishlistProduct from './schemas/WishlistProduct';

// definition
// TODO: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34649
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const schema = buildClientSchema(schemaJSON);
let count = 0;

export default addMocksToSchema({
  schema,
  mocks: {
    Address,
    AddressService,
    AdminProductsConnection,
    Area,
    Authority,
    activeParamsObjectType,
    BackgroundImage,
    City,
    ColorList,
    ConvenienceStore,
    Country,
    DashboardInfo,
    DraftTextProductCustomField,
    ExchangeRate,
    ExportFormat,
    ezPaymentReturnListObjectType,
    FbPixel,
    FetchSmartConversionModuleGADataResponse,
    GMOUserInfo,
    GmoBankInstallment,
    groupProductsObjectType,
    gtag,
    HexColorCode,
    hoverParamsObjectType,
    Icon,
    Image,
    Link,
    Locale,
    MemberGroup,
    Menu,
    MenuDesignObjectType,
    MenuPageObjectType,
    MenuPageParamsObjectType,
    NotificationObjectType,
    nornalParamsObjectType,
    Order,
    OrderApplyList,
    OrderAuditLogOperator,
    OrderConnection,
    OrderProductQuantityDelta,
    Page,
    PageConnection,
    PaymentAccountForCathay,
    PaymentAccountForEzpay,
    PaymentForAllpay,
    PriceDelta,
    paymentInfoType,
    paymentObjectType,
    permissionDesignObj,
    permissionFileObj,
    permissionOrderObj,
    permissionProductObj,
    permissionServiceObj,
    permissionStoreObj,
    permissionUserObj,
    priceObjectType,
    Product,
    productsObjectType,
    RecipientAddress,
    RecipientObjectType,
    RoutingRule,
    SettingObjectType,
    SmartConversionModule,
    Store,
    StoreApp,
    StoreEcfitSettings,
    StorePayment,
    StoreShipment,
    shipmentInfoType,
    shipmentObjectType,
    TagList,
    User,
    UserMemberGroupObjectType,
    UserPoints,
    UserRewardPoint,
    userObjectType,
    VideoLinkProductCustomField,
    WishlistProduct,
    Timestamp: () => getUnixTime(new Date()),
    DateTime: (): string => {
      count += 1;

      return formatRFC3339(addHours(new Date(), count));
    },
    PositiveInt: () => 10,
    JSON: (data, _, __, { fieldName }) => data[fieldName],
    URL: (data, _, __, { fieldName }) => data[fieldName],
  },
});
