// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import memoizeOne from 'memoize-one';
import moment from 'moment';
import idx from 'idx';

import { withNamespaces } from '@store/utils/lib/i18n';

// graphql typescript
import { blocksFragment as blocksFragmentType } from './__generated__/blocksFragment';
import { invoiceInfoFragment as invoiceInfoFragmentType } from './__generated__/invoiceInfoFragment';

// typescript definition
interface PropsType extends I18nPropsType {
  invoices: blocksFragmentType['invoices'];
  children: (
    type: string | null,
    description: React.ReactNode,
  ) => React.ReactNode;
}

// definition
export const invoiceInfoFragment = gql`
  fragment invoiceInfoFragment on OrderInvoice {
    id
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

class InvoiceInfo extends React.PureComponent<PropsType> {
  private invoiceDescription = memoizeOne(
    (
      {
        method,
        title,
        ban,
        address,
        carrier,
        loveCode,
        status,
        code,
        issuedAt,
      }: invoiceInfoFragmentType,
      t: PropsType['t'],
    ) => {
      const date = issuedAt
        ? moment.unix(issuedAt).format('YYYY/MM/DD HH:mm:ss')
        : t('blocks.invoice.waiting');
      const NumberInfo = (
        <>
          <div>
            {t('blocks.invoice.number')}
            {status === 'INVALID'
              ? t('blocks.invoice.invalid')
              : code || t('blocks.invoice.waiting')}
          </div>

          <div>
            {t('blocks.invoice.date')}
            {status === 'INVALID' ? t('blocks.invoice.invalid') : date}
          </div>
        </>
      );
      const carrierCode = idx(carrier, _ => _.carrierCode);

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
                : `${t('blocks.invoice.bar-code')}${carrierCode}`}
              {NumberInfo}
            </>
          );

        case 'DONATION':
          return (
            <div>
              {t('blocks.invoice.love-code')}
              {loveCode}
            </div>
          );

        default:
          return null;
      }
    },
  );

  private transformKey = (key?: string | null) => {
    if (!key) return key;

    return key.replace('_', '-').toLowerCase();
  };

  public render(): React.ReactNode {
    const {
      /** context */
      t,

      /** props */
      children,
      invoices,
    } = this.props;

    if (!invoices) return null;
    if ((invoices || []).length === 0) return null;

    // TODO: invoices should not be null[]
    const filterInvoices = invoices.filter(_ => _) as invoiceInfoFragmentType[];

    const { type, method, carrier } = filterInvoices[filterInvoices.length - 1];

    return children(
      !method
        ? null
        : `${t(`blocks.invoice.type.${this.transformKey(type)}`)}/${t(
            method === 'CARRIER'
              ? `blocks.invoice.carrier.${this.transformKey(
                  idx(carrier, _ => _.carrierType),
                )}`
              : `blocks.invoice.method.${
                  method === 'TRIPLICATE' && type !== 'PAPER'
                    ? 'company'
                    : this.transformKey(method)
                }`,
          )}`,
      this.invoiceDescription(filterInvoices[filterInvoices.length - 1], t),
    );
  }
}

export default withNamespaces('member-order')(InvoiceInfo);
