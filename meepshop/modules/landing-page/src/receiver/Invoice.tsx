// import
import React from 'react';
import { Button, Input, Form, FormInstance } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useValidateBarCode from './hooks/useValidateBarCode';
import useValidateInvoiceVAT from './hooks/useValidateInvoiceVAT';
import useValidateLoveCode from './hooks/useValidateLoveCode';
import styles from './styles/invoice.less';
import { INVOICE_SEARCH_LINK } from './constants';

interface PropsType {
  form: FormInstance;
}

// definition
const { Item } = Form;

export default React.memo(({ form }: PropsType) => {
  const { t } = useTranslation('landing-page');
  const validateBarCode = useValidateBarCode();
  const validateInvoiceVAT = useValidateInvoiceVAT();
  const validateLoveCode = useValidateLoveCode();

  const { getFieldValue } = form;
  const value = getFieldValue('invoice');
  const isECPAY = value?.[0] === 'ECPAY_ELECTRONIC';

  switch (value?.[1]) {
    case 'TRIPLICATE':
      return (
        <>
          <div className={styles.itemRoot}>
            <Item
              className={styles.formItem}
              name="invoiceTitle"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
              ]}
            >
              <Input placeholder={t('invoice-title')} />
            </Item>

            <Item
              className={styles.formItem}
              name="invoiceVAT"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
                {
                  validator: validateInvoiceVAT,
                },
              ]}
            >
              <Input placeholder={t('invoice-number')} />
            </Item>
          </div>

          <Item
            className={styles.formItem}
            name="invoiceAddress"
            initialValue={[
              ...(getFieldValue('address') || []),
              ...(!getFieldValue('addressDetail')
                ? []
                : [getFieldValue('addressDetail')]),
            ].join(' / ')}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
            ]}
          >
            <Input placeholder={t('invoice-address')} />
          </Item>
        </>
      );

    case 'DONATION':
      return (
        <div className={styles.donate}>
          <Item
            className={styles.formItem}
            name="invoiceDonate"
            rules={[
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: (_rule, donateCode, callback) => {
                  if (!/^\d{3,7}$/.test(donateCode))
                    callback(t('wrong-donate-code'));
                  else callback();
                },
              },
              ...(!isECPAY
                ? []
                : [
                    {
                      validator: validateLoveCode,
                    },
                  ]),
            ]}
            validateTrigger="onBlur"
            validateFirst
          >
            <div className={styles.donateInput}>
              <Input placeholder={t('invoice-donate')} />
              <Button href={INVOICE_SEARCH_LINK} target="_blank">
                {t('invoice-search')}
              </Button>
            </div>
          </Item>
          <div>{t('invoice-donate-description')}</div>
        </div>
      );

    case 'MOBILE_BARCODE':
      return (
        <Item
          className={styles.formItem}
          name="invoiceEInvoiceNumber"
          validateFirst
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: t('is-required'),
            },
            {
              pattern: /^\/{1}[0-9.+\-A-Z]{7}$/,
              message: t('wrong-barcode'),
            },
            ...(!isECPAY
              ? [{}]
              : [
                  {
                    validator: validateBarCode,
                  },
                ]),
          ]}
        >
          <Input placeholder={t('invoice-e-invoice-number.moile-barcode')} />,
        </Item>
      );

    case 'CITIZEN_DIGITAL_CERTIFICATE':
      return (
        <Item
          className={styles.formItem}
          name="invoiceEInvoiceNumber"
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
          validateFirst
          validateTrigger="onBlur"
        >
          <Input
            placeholder={t(
              'invoice-e-invoice-number.citizen-digital-certificate',
            )}
          />
        </Item>
      );

    default:
      return null;
  }
});
