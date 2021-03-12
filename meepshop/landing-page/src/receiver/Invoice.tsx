// typescript import
import { FormComponentProps } from 'antd/lib/form/Form';

// import
import React from 'react';
import { Form, Button, Input } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useValidateBarCode from './hooks/useValidateBarCode';
import useValidateInvoiceVAT from './hooks/useValidateInvoiceVAT';
import useValidateLoveCode from './hooks/useValidateLoveCode';
import styles from './styles/invoice.less';
import { INVOICE_SEARCH_LINK } from './constants';

// definition
const { Item } = Form;

export default React.memo(({ form }: FormComponentProps) => {
  const { t } = useTranslation('landing-page');
  const validateBarCode = useValidateBarCode();
  const validateInvoiceVAT = useValidateInvoiceVAT();
  const validateLoveCode = useValidateLoveCode();

  const { getFieldDecorator, getFieldValue } = form;
  const value = getFieldValue('invoice');
  const isECPAY = value?.[0] === 'ECPAY_ELECTRONIC';

  switch (value?.[1]) {
    case 'TRIPLICATE':
      return (
        <>
          <div className={styles.itemRoot}>
            <Item className={styles.formItem}>
              {getFieldDecorator('invoiceTitle', {
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ],
                validateTrigger: 'onBlur',
              })(<Input placeholder={t('invoice-title')} />)}
            </Item>

            <Item className={styles.formItem}>
              {getFieldDecorator('invoiceVAT', {
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                  {
                    validator: validateInvoiceVAT,
                  },
                ],
                validateTrigger: 'onBlur',
              })(<Input placeholder={t('invoice-number')} />)}
            </Item>
          </div>

          <Item className={styles.formItem}>
            {getFieldDecorator('invoiceAddress', {
              initialValue: [
                ...(getFieldValue('address') || []),
                ...(!getFieldValue('addressDetail')
                  ? []
                  : [getFieldValue('addressDetail')]),
              ].join(' / '),
              rules: [
                {
                  required: true,
                  message: t('is-required'),
                },
              ],
              validateTrigger: 'onBlur',
            })(<Input placeholder={t('invoice-address')} />)}
          </Item>
        </>
      );

    case 'DONATION':
      return (
        <div className={styles.donate}>
          <Item className={styles.formItem}>
            {getFieldDecorator('invoiceDonate', {
              rules: [
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
              ],
              validateFirst: true,
              validateTrigger: 'onBlur',
            })(
              <div className={styles.donateInput}>
                <Input placeholder={t('invoice-donate')} />
                <Button href={INVOICE_SEARCH_LINK} target="_blank">
                  {t('invoice-search')}
                </Button>
              </div>,
            )}
          </Item>
          <div>{t('invoice-donate-description')}</div>
        </div>
      );

    case 'MOBILE_BARCODE':
      return (
        <Item className={styles.formItem}>
          {getFieldDecorator('invoiceEInvoiceNumber', {
            rules: [
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
            ],
            validateFirst: true,
            validateTrigger: 'onBlur',
          })(
            <Input placeholder={t('invoice-e-invoice-number.moile-barcode')} />,
          )}
        </Item>
      );

    case 'CITIZEN_DIGITAL_CERTIFICATE':
      return (
        <Item className={styles.formItem}>
          {getFieldDecorator('invoiceEInvoiceNumber', {
            rules: [
              {
                required: true,
                message: t('is-required'),
              },
              {
                pattern: /^[A-Z]{2}[0-9]{14}$/,
                message: t('wrong-certificate'),
              },
            ],
            validateFirst: true,
            validateTrigger: 'onBlur',
          })(
            <Input
              placeholder={t(
                'invoice-e-invoice-number.citizen-digital-certificate',
              )}
            />,
          )}
        </Item>
      );

    default:
      return null;
  }
});
