import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, message, Button } from 'antd';
import { warning } from 'fbjs';

import { withTranslation } from '@meepshop/locales';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import { INVOICE_SEARCH_LINK } from './constants';
import styles from './styles/invoice.less';

const { Item: FormItem } = Form;

@withTranslation('receiver-default-form-item')
@enhancer
@radium
export default class Invoice extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    style: {},
  };

  validateInvoiceVAT = async (_, value) => {
    const { t, getData } = this.props;
    const { data, errors } = await getData(`
      query isBANValid {
        isBANValid(ban: "${value}")
      }
    `).catch(() => {
      throw new Error(t('error'));
    });

    if (errors) {
      warning(!errors.length, JSON.stringify(errors));
      message.error(t('error'));
    }

    if (!data?.isBANValid) throw new Error(t('wrong-invoice-number'));
  };

  validateLoveCode = async (_, value) => {
    const { t, getData } = this.props;
    const { data, errors } = await getData(`
      query IsEInvoiceLoveCodeValid {
        isEInvoiceLoveCodeValid(loveCode: "${value}")
      }
    `).catch(() => {
      throw new Error(t('error'));
    });

    if (errors) {
      warning(!errors.length, JSON.stringify(errors));
      message.error(t('error'));
    }

    if (!data?.isEInvoiceLoveCodeValid) throw new Error(t('wrong-donate-code'));
  };

  validateBarCode = async (_, value) => {
    const { t, getData } = this.props;
    const { data, errors } = await getData(`
      query isEInvoiceBarCodeValid {
        isEInvoiceBarCodeValid(barCode: "${value}")
      }
    `).catch(() => {
      throw new Error(t('error'));
    });

    if (errors) {
      warning(!errors.length, JSON.stringify(errors));
      message.error(t('error'));
    }

    if (!data?.isEInvoiceBarCodeValid) throw new Error(t('wrong-barcode'));
  };

  render() {
    const { colors, t, style, invoice } = this.props;
    const isECPAY = invoice?.[0] === 'ECPAY_ELECTRONIC';

    switch (invoice?.[1]) {
      case 'TRIPLICATE':
        return (
          <>
            <div className={styles.itemRoot}>
              <FormItem
                style={style}
                name={['invoiceTitle']}
                rules={[
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input placeholder={t('invoice-title')} />
              </FormItem>

              <FormItem
                style={style}
                name={['invoiceVAT']}
                rules={[
                  {
                    required: true,
                    message: t('is-required'),
                  },
                  {
                    validator: this.validateInvoiceVAT,
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input placeholder={t('invoice-number')} />
              </FormItem>
            </div>

            <FormItem dependencies={['address', 'addressDetail']} noStyle>
              {({ getFieldValue }) => (
                <FormItem
                  style={style}
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
                  <Input placeholder={t('invoice-address')} />
                </FormItem>
              )}
            </FormItem>
          </>
        );

      case 'DONATION':
        return (
          <div className={styles.donate}>
            <FormItem
              style={style}
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
                isECPAY && {
                  validator: this.validateLoveCode,
                },
              ]}
              validateTrigger="onBlur"
              validateFirst
            >
              <div className={styles.donateInput}>
                <Input placeholder={t('invoice-donate')} />

                <Button
                  style={{
                    color: colors[2],
                    background: colors[4],
                    borderColor: colors[4],
                  }}
                  href={INVOICE_SEARCH_LINK}
                  target="_blank"
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
            style={style}
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
              isECPAY && {
                validator: this.validateBarCode,
              },
            ]}
            validateTrigger="onBlur"
            validateFirst
          >
            <Input placeholder={t('invoice-e-invoice-number.moile-barcode')} />
          </FormItem>
        );

      case 'CITIZEN_DIGITAL_CERTIFICATE':
        return (
          <FormItem
            style={style}
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
              placeholder={t(
                'invoice-e-invoice-number.citizen-digital-certificate',
              )}
            />
          </FormItem>
        );

      default:
        return null;
    }
  }
}
