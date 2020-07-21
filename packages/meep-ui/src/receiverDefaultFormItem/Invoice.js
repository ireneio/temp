import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, message, Button } from 'antd';
import { warning } from 'fbjs';

import { withTranslation } from '@meepshop/utils/lib/i18n';

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
    form: PropTypes.shape({
      // from LandingPage Form.create()
      getFieldValue: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    style: {},
  };

  validateInvoiceVAT = async (rule, value, callback) => {
    const { t, getData } = this.props;

    try {
      const { data, errors } = await getData(`
        query isBANValid {
          isBANValid(ban: "${value}")
        }
      `);

      if (errors) {
        warning(!errors.length, JSON.stringify(errors));
        message.error(t('error'));
      }

      if (data?.isBANValid) return callback();

      return callback(t('wrong-invoice-number'));
    } catch (error) {
      return callback(t('error'));
    }
  };

  validateLoveCode = async (rule, value, callback) => {
    const { t, getData } = this.props;

    try {
      const { data, errors } = await getData(`
        query IsEInvoiceLoveCodeValid {
          isEInvoiceLoveCodeValid(loveCode: "${value}")
        }
      `);

      if (errors) {
        warning(!errors.length, JSON.stringify(errors));
        message.error(t('error'));
      }

      if (data?.isEInvoiceLoveCodeValid) return callback();

      return callback(t('wrong-donate-code'));
    } catch (error) {
      return callback(t('error'));
    }
  };

  validateBarCode = async (rule, value, callback) => {
    const { t, getData } = this.props;

    try {
      const { data, errors } = await getData(`
        query isEInvoiceBarCodeValid {
          isEInvoiceBarCodeValid(barCode: "${value}")
        }
      `);

      if (errors) {
        warning(!errors.length, JSON.stringify(errors));
        message.error(t('error'));
      }

      if (data?.isEInvoiceBarCodeValid) return callback();

      return callback(t('wrong-barcode'));
    } catch (error) {
      return callback(t('error'));
    }
  };

  render() {
    const { colors, t, style, form } = this.props;
    const { getFieldValue, getFieldDecorator } = form;

    const value = getFieldValue('invoice') || [];

    const isECPAY = value[0] === 'ECPAY_ELECTRONIC';

    switch (value[1]) {
      case 'TRIPLICATE':
        return (
          <>
            <div className={styles.itemRoot}>
              <FormItem style={style}>
                {getFieldDecorator('invoiceTitle', {
                  rules: [
                    {
                      required: true,
                      message: t('is-required'),
                    },
                  ],
                  validateTrigger: 'onBlur',
                })(<Input placeholder={t('invoice-title')} />)}
              </FormItem>

              <FormItem style={style}>
                {getFieldDecorator('invoiceVAT', {
                  rules: [
                    {
                      required: true,
                      message: t('is-required'),
                    },
                    {
                      validator: this.validateInvoiceVAT,
                    },
                  ],
                  validateTrigger: 'onBlur',
                })(<Input placeholder={t('invoice-number')} />)}
              </FormItem>
            </div>

            <FormItem style={style}>
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
            </FormItem>
          </>
        );

      case 'DONATION':
        return (
          <div className={styles.donate}>
            <FormItem style={style}>
              {getFieldDecorator('invoiceDonate', {
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                  {
                    validator: (rule, donateCode, callback) => {
                      if (!/^\d{3,7}$/.test(donateCode))
                        callback(t('wrong-donate-code'));
                      else callback();
                    },
                  },
                  isECPAY && {
                    validator: this.validateLoveCode,
                  },
                ],
                validateFirst: true,
                validateTrigger: 'onBlur',
              })(
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
                </div>,
              )}
            </FormItem>
            <div>{t('invoice-donate-description')}</div>
          </div>
        );

      case 'MOBILE_BARCODE':
        return (
          <FormItem style={style}>
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
                isECPAY && {
                  validator: this.validateBarCode,
                },
              ],
              validateFirst: true,
              validateTrigger: 'onBlur',
            })(
              <Input
                placeholder={t('invoice-e-invoice-number.moile-barcode')}
              />,
            )}
          </FormItem>
        );

      case 'CITIZEN_DIGITAL_CERTIFICATE':
        return (
          <FormItem style={style}>
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
          </FormItem>
        );

      default:
        return null;
    }
  }
}
