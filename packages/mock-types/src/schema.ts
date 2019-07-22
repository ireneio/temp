// import
import { buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';

// Generate by command
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import schemaJSON from '../schema.json';

import AddressObjectType from './schemas/AddressObjectType';
import Authority from './schemas/Authority';
import ColorList from './schemas/ColorList';
import DashboardInfo from './schemas/DashboardInfo';
import exchangeRate from './schemas/exchangeRate';
import ezPaymentReturnListObjectType from './schemas/ezPaymentReturnListObjectType';
import ExportFormat from './schemas/ExportFormat';
import GmoBankInstallment from './schemas/GmoBankInstallment';
import GMOUserInfo from './schemas/GMOUserInfo';
import MemberGroupList from './schemas/MemberGroupList';
import NotificationObjectType from './schemas/NotificationObjectType';
import Order from './schemas/Order';
import OrderConnection from './schemas/OrderConnection';
import permissionDesignObj from './schemas/permissionDesignObj';
import permissionFileObj from './schemas/permissionFileObj';
import permissionOrderObj from './schemas/permissionOrderObj';
import permissionProductObj from './schemas/permissionProductObj';
import permissionServiceObj from './schemas/permissionServiceObj';
import permissionStoreObj from './schemas/permissionStoreObj';
import permissionUserObj from './schemas/permissionUserObj';
import paymentInfoType from './schemas/paymentInfoType';
import PaymentAccountForEzpay from './schemas/PaymentAccountForEzpay';
import shipmentInfoType from './schemas/shipmentInfoType';
import shipmentObjectType from './schemas/shipmentObjectType';
import StorePayment from './schemas/StorePayment';
import StoreShipment from './schemas/StoreShipment';
import StoreEcfitSettings from './schemas/StoreEcfitSettings';
import Store from './schemas/Store';
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
    AddressObjectType,
    Authority,
    ColorList,
    DashboardInfo,
    exchangeRate,
    ezPaymentReturnListObjectType,
    ExportFormat,
    GmoBankInstallment,
    GMOUserInfo,
    MemberGroupList,
    NotificationObjectType,
    Order,
    OrderConnection,
    permissionDesignObj,
    permissionFileObj,
    permissionOrderObj,
    permissionProductObj,
    permissionServiceObj,
    permissionStoreObj,
    permissionUserObj,
    paymentInfoType,
    PaymentAccountForEzpay,
    shipmentInfoType,
    shipmentObjectType,
    StorePayment,
    StoreShipment,
    StoreEcfitSettings,
    Store,
    SettingObjectType,
    User,
    UserPoints,
    UserRewardPoint,
    UserMemberGroupObjectType,
    WishlistProduct,
    Timestamp: () => Number.MAX_SAFE_INTEGER,
    JSON: data => data,
  },
});

export default schema;
