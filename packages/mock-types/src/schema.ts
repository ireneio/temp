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
  },
});

export default schema;
