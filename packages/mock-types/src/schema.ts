// import
import { buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';
import moment from 'moment';

// Generate by command
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import schemaJSON from '../schema.json';

import Address from './schemas/Address';
import AddressService from './schemas/AddressService';
import Authority from './schemas/Authority';
import ColorList from './schemas/ColorList';
import ConvenienceStore from './schemas/ConvenienceStore';
import DashboardInfo from './schemas/DashboardInfo';
import ExchangeRate from './schemas/ExchangeRate';
import ezPaymentReturnListObjectType from './schemas/ezPaymentReturnListObjectType';
import ExportFormat from './schemas/ExportFormat';
import GmoBankInstallment from './schemas/GmoBankInstallment';
import GMOUserInfo from './schemas/GMOUserInfo';
import MemberGroupList from './schemas/MemberGroupList';
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
import PaymentAccountForEzpay from './schemas/PaymentAccountForEzpay';
import PaymentForAllpay from './schemas/PaymentForAllpay';
import RecipientAddress from './schemas/RecipientAddress';
import shipmentInfoType from './schemas/shipmentInfoType';
import shipmentObjectType from './schemas/shipmentObjectType';
import StorePayment from './schemas/StorePayment';
import StoreShipment from './schemas/StoreShipment';
import StoreEcfitSettings from './schemas/StoreEcfitSettings';
import Store from './schemas/Store';
import StoreApp from './schemas/StoreApp';
import SettingObjectType from './schemas/SettingObjectType';
import User from './schemas/User';
import UserPoints from './schemas/UserPoints';
import UserRewardPoint from './schemas/UserRewardPoint';
import UserMemberGroupObjectType from './schemas/UserMemberGroupObjectType';
import WishlistProduct from './schemas/WishlistProduct';

// definition
// TODO: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34649
// @ts-ignore
const schema = buildClientSchema(schemaJSON);

addMockFunctionsToSchema({
  schema,
  mocks: {
    Address,
    AddressService,
    Authority,
    ColorList,
    ConvenienceStore,
    DashboardInfo,
    ExchangeRate,
    ezPaymentReturnListObjectType,
    ExportFormat,
    GmoBankInstallment,
    GMOUserInfo,
    MemberGroupList,
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
    PaymentAccountForEzpay,
    PaymentForAllpay,
    RecipientAddress,
    shipmentInfoType,
    shipmentObjectType,
    StorePayment,
    StoreShipment,
    StoreEcfitSettings,
    Store,
    StoreApp,
    SettingObjectType,
    User,
    UserPoints,
    UserRewardPoint,
    UserMemberGroupObjectType,
    WishlistProduct,
    Timestamp: () => moment().unix(),
    DateTime: () => moment().format(),
    JSON: (data, _, __, { fieldName }) => data[fieldName],
    URL: () =>
      'https://res.cloudinary.com/cakeresume/image/upload/s--Lv6sj1oB--/c_pad,fl_png8,h_200,w_200/v1509504375/pcotebjqdkfuqbvbt4xc.png',
  },
});

export default schema;
