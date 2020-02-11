// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@store/utils/lib/i18n';

import NumberInfo from './NumberInfo';

// graphql typescript
import { blocksFragment as blocksFragmentType } from '../__generated__/blocksFragment';
import { invoiceInfoFragment as invoiceInfoFragmentType } from './__generated__/invoiceInfoFragment';

// graphql import
import { numberInfoFragment } from './NumberInfo';

// typescript definition
interface PropsType {
  invoices: blocksFragmentType['invoices'];
  children: (
    type: string | null,
    description: React.ReactNode,
  ) => React.ReactElement;
}

// definition
export const invoiceInfoFragment = gql`
  fragment invoiceInfoFragment on OrderInvoice {
    ...numberInfoFragment
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
  }

  ${numberInfoFragment}
`;

export default React.memo(({ invoices, children }: PropsType) => {
  const { t } = useTranslation('member-order');

  if (!invoices || invoices.length === 0) return null;

  // TODO: invoices should not be null[]
  const [invoice] = (invoices.filter(
    Boolean,
  ) as invoiceInfoFragmentType[]).slice(-1);
  const { type, method, carrier, loveCode, title, ban, address } = invoice;
  const carrierCode = carrier?.carrierCode;
  const tag = !method
    ? null
    : `${t(`blocks.invoice.type.${type}`)}/${t(
        method === 'CARRIER'
          ? `blocks.invoice.carrier.${carrier?.carrierType}`
          : `blocks.invoice.method.${
              method === 'TRIPLICATE' && type !== 'PAPER' ? 'COMPANY' : method
            }`,
      )}`;

  switch (method) {
    case 'DUPLICATE':
      return children(
        tag,
        <NumberInfo orderInvoice={filter(numberInfoFragment, invoice)} />,
      );

    case 'TRIPLICATE':
      return children(
        tag,
        <>
          <div>{title}</div>
          <div>{ban}</div>
          <div>{address}</div>

          <NumberInfo orderInvoice={filter(numberInfoFragment, invoice)} />
        </>,
      );

    case 'CARRIER':
      return children(
        tag,
        <>
          {!carrierCode
            ? null
            : `${t('blocks.invoice.bar-code')}${carrierCode}`}

          <NumberInfo orderInvoice={filter(numberInfoFragment, invoice)} />
        </>,
      );

    case 'DONATION':
      return children(
        tag,
        <div>
          {t('blocks.invoice.love-code')}
          {loveCode}
        </div>,
      );

    default:
      return children(tag, null);
  }
});
