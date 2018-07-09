import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Select } from 'antd';

import { enhancer } from 'layout';

import { INVOICE_E_INVOICE, INVOICE_SEARCH_LINK } from './constants';
import * as LOCALE from './locale';
import * as styles from './styles/invoice';

const { Item: FormItem } = Form;
const { Search } = Input;
const { Option } = Select;

@enhancer
@radium
export default class Invoice extends React.PureComponent {
  static propTypes = {
    /** context */
    transformLocale: PropTypes.func.isRequired,

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

  render() {
    const { transformLocale, style, form } = this.props;
    const { getFieldValue, getFieldDecorator } = form;

    switch (getFieldValue('invoice')) {
      case 2: // triplicate
        return (
          <React.Fragment>
            <div style={styles.itemRoot}>
              <FormItem style={style}>
                {getFieldDecorator('invoiceTitle', {
                  rules: [
                    {
                      required: true,
                      message: transformLocale(LOCALE.IS_REQUIRED),
                    },
                  ],
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
              })(
                <Input placeholder={transformLocale(LOCALE.INVOICE_ADDRESS)} />,
              )}
            </FormItem>
          </React.Fragment>
        );

      case 3: // eInvoice
        return (
          <div style={styles.itemRoot}>
            <FormItem style={style}>
              {getFieldDecorator('invoiceEInvoice', {
                initialValue: 1,
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
              })(
                <Select placeholder={transformLocale(LOCALE.INVOICE_E_INVOICE)}>
                  {INVOICE_E_INVOICE.map((eInvoiceType, index) => (
                    <Option key={eInvoiceType} value={index + 1}>
                      {transformLocale(
                        LOCALE.INVOICE_E_INVOICE_TYPE[eInvoiceType],
                      )}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>

            {getFieldValue('invoiceEInvoice') === 1 ? null : (
              <FormItem style={style}>
                {getFieldDecorator('invoiceEInvoiceNumber', {
                  rules: [
                    {
                      required: true,
                      message: transformLocale(LOCALE.IS_REQUIRED),
                    },
                  ],
                })(
                  <Input
                    placeholder={transformLocale(
                      LOCALE.INVOICE_E_INVOICE_NUMBER[
                        INVOICE_E_INVOICE[getFieldValue('invoiceEInvoice') - 1]
                      ],
                    )}
                  />,
                )}
              </FormItem>
            )}
          </div>
        );

      case 4: // donate
        return (
          <FormItem style={style}>
            {getFieldDecorator('invoiceDonate', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
              ],
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

      default:
        return null;
    }
  }
}
