// import
import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';

import { INVOICE_SEARCH_LINK } from './constants';
import useValidateInvoiceVAT from './hooks/useValidateInvoiceVAT';
import useValidateLoveCode from './hooks/useValidateLoveCode';
import useValidateBarCode from './hooks/useValidateBarCode';
import styles from './styles/invoice.less';

// typescript definition
interface PropsType {
  invoice: string[] | null;
}

// definition
const { Item: FormItem } = Form;

export default React.memo(({ invoice }: PropsType) => {
  const { t } = useTranslation('checkout');
  const colors = useContext(ColorsContext);
  const validateInvoiceVAT = useValidateInvoiceVAT();
  const validateLoveCode = useValidateLoveCode();
  const validateBarCode = useValidateBarCode();

  const isECPAY = invoice?.[0] === 'ECPAY_ELECTRONIC';

  switch (invoice?.[1]) {
    case 'TRIPLICATE':
      return (
        <>
          <div className={styles.triplicate}>
            <FormItem
              name={['invoiceTitle']}
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input size="large" placeholder={t('invoice-title')} />
            </FormItem>

            <FormItem
              name={['invoiceVAT']}
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
                {
                  validator: validateInvoiceVAT,
                },
              ]}
              validateTrigger="onBlur"
              validateFirst
            >
              <Input size="large" placeholder={t('invoice-number')} />
            </FormItem>
          </div>

          <FormItem dependencies={['address', 'addressDetail']} noStyle>
            {({ getFieldValue }) => (
              <FormItem
                name={['invoiceAddress']}
                initialValue={[
                  ...(getFieldValue('address') || []),
                  getFieldValue('addressDetail'),
                ]
                  .filter(Boolean)
                  .join(' / ')}
                rules={[
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input size="large" placeholder={t('invoice-address')} />
              </FormItem>
            )}
          </FormItem>
        </>
      );

    case 'DONATION':
      return (
        <div className={styles.donate}>
          <FormItem
            name={['invoiceDonate']}
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                pattern: /^\d{3,7}$/,
                message: t('wrong-donate-code'),
              },
              ...(isECPAY
                ? [
                    {
                      validator: validateLoveCode,
                    },
                  ]
                : []),
            ]}
            validateTrigger="onBlur"
            validateFirst
          >
            <div className={styles.donateInput}>
              <Input size="large" placeholder={t('invoice-donate')} />

              <Button
                style={{
                  color: colors[2],
                  background: colors[4],
                  borderColor: colors[4],
                }}
                href={INVOICE_SEARCH_LINK}
                target="_blank"
                size="large"
              >
                {t('invoice-search')}
              </Button>
            </div>
          </FormItem>

          <div>{t('invoice-donate-description')}</div>
        </div>
      );

    case 'MOBILE_BARCODE':
      return (
        <FormItem
          name={['invoiceEInvoiceNumber']}
          rules={[
            {
              required: true,
              message: t('is-required'),
            },
            {
              pattern: /^\/{1}[0-9.+\-A-Z]{7}$/,
              message: t('wrong-barcode'),
            },
            ...(isECPAY
              ? [
                  {
                    validator: validateBarCode,
                  },
                ]
              : []),
          ]}
          validateTrigger="onBlur"
          validateFirst
        >
          <Input
            size="large"
            placeholder={t('invoice-e-invoice-number.moile-barcode')}
          />
        </FormItem>
      );

    case 'CITIZEN_DIGITAL_CERTIFICATE':
      return (
        <FormItem
          name={['invoiceEInvoiceNumber']}
          rules={[
            {
              required: true,
              message: t('is-required'),
            },
            {
              pattern: /^[A-Z]{2}[0-9]{14}$/,
              message: t('wrong-certificate'),
            },
          ]}
          validateTrigger="onBlur"
          validateFirst
        >
          <Input
            size="large"
            placeholder={t(
              'invoice-e-invoice-number.citizen-digital-certificate',
            )}
          />
        </FormItem>
      );

    default:
      return null;
  }
});
