// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';

import NumberInfo from './NumberInfo';

// graphql typescript
import {
  blocksFragment as blocksFragmentType,
  invoiceInfoFragment as invoiceInfoFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { numberInfoFragment } from './gqls/numerInfo';

// typescript definition
interface PropsType {
  invoices: blocksFragmentType['invoices'];
  children: (
    type: string | null,
    description: React.ReactNode,
  ) => React.ReactElement;
}

// definition
export default React.memo(({ invoices, children }: PropsType) => {
  const { t } = useTranslation('member-order');

  if (!invoices || invoices.length === 0) return null;

  // SHOULD_NOT_BE_NULL
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
          {t('blocks.invoice.donate-code')}
          {loveCode}
        </div>,
      );

    default:
      return children(tag, null);
  }
});
