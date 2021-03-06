// import
import { split, from, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';

import { buildWithApollo } from '@meepshop/apollo';

import * as OrderConnection from './OrderConnection';
import * as User from './User';
import getTestOperation from './utils/getTestOperation';

// definition
const shouldIgnoreErrorMessages = [
  'FAIL_TIMEOUT',
  'FAIL_UNKNOWN_ECFIT_ERROR_CODE',
  'FAIL_01_FIELD_ORDER_NO_BLANK',
  'FAIL_02_FIELD_INVOICED_BLANK',
  'FAIL_03_FIELD_BAN_WRONG',
  'FAIL_04_FIELD_NPO_WRONG',
  'FAIL_05_BAN_NOT_ALLOWED_WHEN_NPO_FILLED',
  'FAIL_06_FIELD_DEMAND_CANNOT_BE_Y_WHEN_NPO_FILLED',
  'FAIL_07_INCOMPLETE_CUSTOMER_INFO',
  'FAIL_08_BLANK_ORDER_PRODUCT_OR_PRODUCT_QUANTITY_ZERO',
  'FAIL_09_FIELD_AMOUNT_WRONG',
  'FAIL_10_UNKNOWN_ERROR',
  'FAIL_11_ORDER_NOT_FOUND',
  'FAIL_12_FIELD_ARRIVE_LESS_THAN_NOW',
  'FAIL_13_DUPLICATE_ORDER_NO',
  'FAIL_14_WRONG_PRODUCT_BARCODE',
  'FAIL_15_FIELD_LOGISTICS_ID_WRONG',
  'FAIL_16_PRODUCT_NOT_FOUND',
  'FAIL_17_FIELD_ARRIVE_TYPE_WRONG',
  'FAIL_18_FILED_CREDIT_NO_WRONG',
  'FAIL_19_BUYER_REQUIRED_WHEN_FIELD_INVOICED_IS_Y',
  'FAIL_20_NO_BUYER_WHEN_FIELD_INVOICED_IS_N',
  'FAIL_21_FIELD_EMAIL_FORMAT_ERROR',
  'FAIL_22_FIELD_TAX_TYPE_WRONG',
  'FAIL_23_FIELD_CLEARANCE_MARK_WRONG',
  'FAIL_24_FIELD_PHONE_FORMAT_ERROR',
  'FAIL_41_FIELD_CODE_REQUIRED',
  'FAIL_42_STORE_PICK_UP_REQUIRE_CODE',
  'FAIL_43_CODE_NOT_ALLOWED_WHEN_NOT_STORE_PICK_UP',
  'FAIL_01_ORDER_NOT_FOUND',
  'FAIL_02_ORDER_STATUS_CANCELED_OR_CLOSED',
  'FAIL_03_ORDER_STATUS_WRONG_OR_NOT_ALLOWED',
];

export const resolvers = [OrderConnection.resolvers, User.resolvers];

export default buildWithApollo({
  name: 'admin',
  resolvers,
  terminatingLink: split(
    getTestOperation('applicantInitiatesStore'),
    from([
      setContext(() => ({
        uri: '/api/authorize',
      })),
      new HttpLink(),
    ]),
    split(getTestOperation('uploadImages'), createUploadLink(), new HttpLink()),
  ),
  errorFilter: ({ message }: Error) =>
    !shouldIgnoreErrorMessages.includes(message),
});
