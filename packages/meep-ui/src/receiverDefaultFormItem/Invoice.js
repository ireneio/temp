import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, message } from 'antd';
import { warning } from 'fbjs';

import { enhancer } from 'layout/DecoratorsRoot';

import { INVOICE_SEARCH_LINK } from './constants';
import * as LOCALE from './locale';
import * as styles from './styles/invoice';

const { Item: FormItem } = Form;
const { Search } = Input;

@enhancer
@radium
export default class Invoice extends React.PureComponent {
  static propTypes = {
    /** context */
    transformLocale: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    style: PropTypes.shape({}),
    form: PropTypes.shape({
      // from LandingPage Form.create()
      getFieldValue: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    style: {},
  };

  validateLoveCode = async (rule, value, callback) => {
    const { transformLocale, getData } = this.props;

    const { data, errors } = await getData(`
      query IsEInvoiceLoveCodeValid {
        isEInvoiceLoveCodeValid(loveCode: "${value}")
      }
    `);

    if (errors) {
      warning(!errors.length, JSON.stringify(errors));
      message.error(transformLocale(LOCALE.ERROR));
    }

    if (data?.isEInvoiceLoveCodeValid) {
      return callback();
    }

    return callback(transformLocale(LOCALE.WRONG_LOVECODE));
  };

  render() {
    const { transformLocale, style, form } = this.props;
    const { getFieldValue, getFieldDecorator } = form;

    const value = getFieldValue('invoice') || [];

    const isECPAY = value[0] === 'ECPAY_ELECTRONIC';

    switch (value[1]) {
      case 'TRIPLICATE':
        return (
          <>
            <div style={styles.itemRoot}>
              <FormItem style={style}>
                {getFieldDecorator('invoiceTitle', {
                  rules: [
                    {
                      required: true,
                      message: transformLocale(LOCALE.IS_REQUIRED),
                    },
                  ],
                  validateTrigger: 'onBlur',
                })(
                  <Input placeholder={transformLocale(LOCALE.INVOICE_TITLE)} />,
                )}
              </FormItem>

              <FormItem style={style}>
                {getFieldDecorator('invoiceVAT', {
                  rules: [
                    {
                      required: true,
                      message: transformLocale(LOCALE.IS_REQUIRED),
                    },
                  ],
                  validateTrigger: 'onBlur',
                })(
                  <Input
                    placeholder={transformLocale(LOCALE.INVOICE_NUMBER)}
                  />,
                )}
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
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
                validateTrigger: 'onBlur',
              })(
                <Input placeholder={transformLocale(LOCALE.INVOICE_ADDRESS)} />,
              )}
            </FormItem>
          </>
        );

      case 'DONATION':
        return (
          <FormItem style={style}>
            {getFieldDecorator('invoiceDonate', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
                isECPAY && {
                  validator: this.validateLoveCode,
                },
              ],
              validateTrigger: 'onBlur',
            })(
              <Search
                placeholder={transformLocale(LOCALE.INVOICE_DONATE)}
                enterButton={
                  <a
                    href={INVOICE_SEARCH_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {transformLocale(LOCALE.INVOICE_SEARCH)}
                  </a>
                }
              />,
            )}
          </FormItem>
        );

      case 'MOBILE_BARCODE':
        return (
          <FormItem style={style}>
            {getFieldDecorator('invoiceEInvoiceNumber', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
                {
                  pattern: /^\/{1}[0-9.+\-A-Z]{7}$/,
                  message: transformLocale(LOCALE.WRONG_BARCODE),
                },
              ],
              validateTrigger: 'onBlur',
            })(
              <Input
                placeholder={transformLocale(
                  LOCALE.INVOICE_E_INVOICE_NUMBER[value[1]],
                )}
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
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
                {
                  pattern: /^[A-Z]{2}[0-9]{14}$/,
                  message: transformLocale(LOCALE.WRONG_CERTIFICATE),
                },
              ],
              validateTrigger: 'onBlur',
            })(
              <Input
                placeholder={transformLocale(
                  LOCALE.INVOICE_E_INVOICE_NUMBER[value[1]],
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
