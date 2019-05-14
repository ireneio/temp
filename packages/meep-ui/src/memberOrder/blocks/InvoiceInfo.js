import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import memoizeOne from 'memoize-one';
import moment from 'moment';
import { areEqual } from 'fbjs';

import { contextProvider } from 'context';

import * as LOCALE from './locale';

const { enhancer } = contextProvider('locale');

export const invoiceInfoFragment = gql`
  fragment invoiceInfoFragment on OrderInvoice {
    type
    method
    carrier {
      carrierType: type
      carrierCode: code
    }
    loveCode
    title
    ban
    address
    status
    code
    issuedAt
  }
`;

@enhancer
export default class InvoiceInfo extends React.PureComponent {
  static propTypes = {
    children: PropTypes.func.isRequired,
    invoices: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  invoiceDescription = memoizeOne(
    ({
      method,
      title,
      ban,
      address,
      carrier: { carrierCode },
      loveCode,
      status,
      code,
      issuedAt,
    }) => {
      const { transformLocale } = this.props;
      const date = issuedAt
        ? moment.unix(issuedAt).format('YYYY/MM/DD HH:mm:ss')
        : transformLocale(LOCALE.INVOICE_WAITING);
      const NumberInfo = (
        <>
          <div>
            {transformLocale(LOCALE.INVOICE_NUMBER)}
            {status === 'INVALID'
              ? transformLocale(LOCALE.INVOICE_INVALID)
              : code || transformLocale(LOCALE.INVOICE_WAITING)}
          </div>

          <div>
            {transformLocale(LOCALE.INVOICE_DATE)}
            {status === 'INVALID'
              ? transformLocale(LOCALE.INVOICE_INVALID)
              : date}
          </div>
        </>
      );

      switch (method) {
        case 'DUPLICATE':
          return NumberInfo;

        case 'TRIPLICATE':
          return (
            <>
              <div>{title}</div>
              <div>{ban}</div>
              <div>{address}</div>
              {NumberInfo}
            </>
          );

        case 'CARRIER':
          return (
            <>
              {!carrierCode
                ? null
                : `${transformLocale(LOCALE.BAR_CODE)}${carrierCode}`}
              {NumberInfo}
            </>
          );

        case 'DONATION':
          return (
            <div>
              {transformLocale(LOCALE.LOVE_CODE)}
              {loveCode}
            </div>
          );

        default:
          return null;
      }
    },
    areEqual,
  );

  render() {
    const {
      /** context */
      transformLocale,

      /** props */
      children,
      invoices,
    } = this.props;

    if ((invoices || []).length === 0) return null;

    const {
      type,
      method,
      carrier: { carrierType },
    } = invoices[invoices.length - 1];

    return children(
      `${transformLocale(LOCALE.INVOICE_TYPE[type])}/${transformLocale(
        method === 'CARRIER'
          ? LOCALE.INVOICE_CARRIER[carrierType]
          : LOCALE.INVOICE_METHOD(type, method),
      )}`,
      this.invoiceDescription(invoices[invoices.length - 1]),
    );
  }
}
