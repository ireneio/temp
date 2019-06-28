// import
import { buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';

// Generate by command
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import schemaJSON from '../schema.json';
import OrderConnection from './schemas/OrderConnection';
import Order from './schemas/Order';
import StorePayment from './schemas/StorePayment';
import paymentInfoType from './schemas/paymentInfoType';
import ezPaymentReturnListObjectType from './schemas/ezPaymentReturnListObjectType';
import PaymentAccountForEzpay from './schemas/PaymentAccountForEzpay';
import StoreShipment from './schemas/StoreShipment';
import shipmentInfoType from './schemas/shipmentInfoType';
import shipmentObjectType from './schemas/shipmentObjectType';
import User from './schemas/User';
import Authority from './schemas/Authority';
import permissionDesignObj from './schemas/permissionDesignObj';
import permissionFileObj from './schemas/permissionFileObj';
import permissionOrderObj from './schemas/permissionOrderObj';
import permissionProductObj from './schemas/permissionProductObj';
import permissionServiceObj from './schemas/permissionServiceObj';
import permissionStoreObj from './schemas/permissionStoreObj';
import permissionUserObj from './schemas/permissionUserObj';
import StoreEcfitSettings from './schemas/StoreEcfitSettings';
import DashboardInfo from './schemas/DashboardInfo';
import Store from './schemas/Store';
import ExportFormat from './schemas/ExportFormat';
import GMOUserInfo from './schemas/GMOUserInfo';
import GmoBankInstallment from './schemas/GmoBankInstallment';
import ColorList from './schemas/ColorList';

// definition
// TODO: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/34649
// @ts-ignore
const schema = buildClientSchema(schemaJSON);

addMockFunctionsToSchema({
  schema,
  mocks: {
    OrderConnection,
    Order,
    StorePayment,
    paymentInfoType,
    ezPaymentReturnListObjectType,
    PaymentAccountForEzpay,
    StoreShipment,
    shipmentInfoType,
    shipmentObjectType,
    User,
    Authority,
    permissionDesignObj,
    permissionFileObj,
    permissionOrderObj,
    permissionProductObj,
    permissionServiceObj,
    permissionStoreObj,
    permissionUserObj,
    StoreEcfitSettings,
    DashboardInfo,
    Store,
    ExportFormat,
    GMOUserInfo,
    GmoBankInstallment,
    ColorList,
  },
});

export default schema;
