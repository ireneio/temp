import { buildClientSchema } from 'graphql';
import { addMockFunctionsToSchema } from 'graphql-tools';

// Generate by command
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import schemaJSON from '../schema.json';
import Order from './schemas/Order';
import ezPaymentReturnListObjectType from './schemas/ezPaymentReturnListObjectType';
import PaymentAccountForEzpay from './schemas/PaymentAccountForEzpay';

const schema = buildClientSchema(schemaJSON);

addMockFunctionsToSchema({
  schema,
  mocks: {
    Order,
    ezPaymentReturnListObjectType,
    PaymentAccountForEzpay,
  },
});

export default schema;
