// import
import { buildClientSchema } from 'graphql';
import { addMocksToSchema } from 'graphql-tools';
import moment from 'moment';

// Generate by command
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import schemaJSON from '../schema';

import Address from './schemas/Address';
import AddressService from './schemas/AddressService';
import AppLogin from './schemas/AppLogin';
import Authority from './schemas/Authority';
import BackgroundImage from './schemas/BackgroundImage';
import ColorList from './schemas/ColorList';
import ConvenienceStore from './schemas/ConvenienceStore';
import DashboardInfo from './schemas/DashboardInfo';
import DraftTextProductCustomField from './schemas/DraftTextProductCustomField';
import ExchangeRate from './schemas/ExchangeRate';
import ezPaymentReturnListObjectType from './schemas/ezPaymentReturnListObjectType';
import ExportFormat from './schemas/ExportFormat';
import FbPixel from './schemas/FbPixel';
import FileConnection from './schemas/FileConnection';
import gtag from './schemas/gtag';
import GmoBankInstallment from './schemas/GmoBankInstallment';
import GMOUserInfo from './schemas/GMOUserInfo';
import HexColorCode from './schemas/HexColorCode';
import Image from './schemas/Image';
import MemberGroup from './schemas/MemberGroup';
import NotificationObjectType from './schemas/NotificationObjectType';
import Order from './schemas/Order';
import OrderConnection from './schemas/OrderConnection';
import OrderApplyList from './schemas/OrderApplyList';
import permissionDesignObj from './schemas/permissionDesignObj';
import permissionFileObj from './schemas/permissionFileObj';
import permissionOrderObj from './schemas/permissionOrderObj';
import permissionProductObj from './schemas/permissionProductObj';
import permissionServiceObj from './schemas/permissionServiceObj';
import permissionStoreObj from './schemas/permissionStoreObj';
import permissionUserObj from './schemas/permissionUserObj';
import paymentInfoType from './schemas/paymentInfoType';
import paymentObjectType from './schemas/paymentObjectType';
import productsObjectType from './schemas/productsObjectType';
import priceObjectType from './schemas/priceObjectType';
import Page from './schemas/Page';
import PageConnection from './schemas/PageConnection';
import PaymentAccountForEzpay from './schemas/PaymentAccountForEzpay';
import PaymentAccountForCathay from './schemas/PaymentAccountForCathay';
import PaymentForAllpay from './schemas/PaymentForAllpay';
import RecipientAddress from './schemas/RecipientAddress';
import RecipientObjectType from './schemas/RecipientObjectType';
import shipmentInfoType from './schemas/shipmentInfoType';
import shipmentObjectType from './schemas/shipmentObjectType';
import StorePayment from './schemas/StorePayment';
import StoreShipment from './schemas/StoreShipment';
import StoreEcfitSettings from './schemas/StoreEcfitSettings';
import Store from './schemas/Store';
import StoreApp from './schemas/StoreApp';
import SettingObjectType from './schemas/SettingObjectType';
import TagList from './schemas/TagList';
import User from './schemas/User';
import UserPoints from './schemas/UserPoints';
import UserRewardPoint from './schemas/UserRewardPoint';
import UserMemberGroupObjectType from './schemas/UserMemberGroupObjectType';
import userObjectType from './schemas/userObjectType';
import VideoLinkProductCustomField from './schemas/VideoLinkProductCustomField';
import WishlistProduct from './schemas/WishlistProduct';

// definition
// TODO: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34649
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const schema = buildClientSchema(schemaJSON);
let count = 0;

addMocksToSchema({
  schema,
  mocks: {
    Address,
    AddressService,
    AppLogin,
    Authority,
    BackgroundImage,
    ColorList,
    ConvenienceStore,
    DashboardInfo,
    DraftTextProductCustomField,
    ExchangeRate,
    ezPaymentReturnListObjectType,
    ExportFormat,
    FbPixel,
    FileConnection,
    gtag,
    GmoBankInstallment,
    GMOUserInfo,
    HexColorCode,
    Image,
    MemberGroup,
    NotificationObjectType,
    Order,
    OrderConnection,
    OrderApplyList,
    permissionDesignObj,
    permissionFileObj,
    permissionOrderObj,
    permissionProductObj,
    permissionServiceObj,
    permissionStoreObj,
    permissionUserObj,
    paymentInfoType,
    paymentObjectType,
    productsObjectType,
    priceObjectType,
    Page,
    PageConnection,
    PaymentAccountForEzpay,
    PaymentAccountForCathay,
    PaymentForAllpay,
    RecipientAddress,
    RecipientObjectType,
    shipmentInfoType,
    shipmentObjectType,
    StorePayment,
    StoreShipment,
    StoreEcfitSettings,
    Store,
    StoreApp,
    SettingObjectType,
    TagList,
    User,
    UserPoints,
    UserRewardPoint,
    UserMemberGroupObjectType,
    userObjectType,
    VideoLinkProductCustomField,
    WishlistProduct,
    Timestamp: () => moment().unix(),
    DateTime: (): string => {
      count += 1;

      return moment()
        .add(count, 'hour')
        .format();
    },
    JSON: (data, _, __, { fieldName }) => data[fieldName],
    URL: (data, _, __, { fieldName }) => data[fieldName],
  },
});

export default schema;
