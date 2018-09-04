import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Select } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import AddressCascader from 'addressCascader';
import {
  STORE_SETTING_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
  COUNTRY_TYPE,
} from 'constants/propTypes';
import INVOICE from 'constants/invoice';
import validateMobile from 'utils/validateMobile';
import { TAIWAN } from 'locale/country';

import Invoice from './Invoice';
import ChooseShipmentStore from './ChooseShipmentStore';
import { ID_NUMBER_CITY_CODE, ID_NUMBER_WEIGHTED } from './constants';
import * as LOCALE from './locale';

const { Item: FormItem } = Form;
const { Option } = Select;

@enhancer
@radium
export default class ReceiverDefaultFormItem extends React.PureComponent {
  static propTypes = {
    /** context */
    storeSetting: STORE_SETTING_TYPE.isRequired,
    transformLocale: PropTypes.func.isRequired,

    /** props */
    style: PropTypes.shape({}),
    chooseShipmentTemplate: SHIPMENT_TEMPLATE_TYPE,
    form: PropTypes.shape({}).isRequired, // from LandingPage Form.create()

    /** moduleProps */
    countries: PropTypes.arrayOf(COUNTRY_TYPE.isRequired),
    invoiceIsNeeded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    style: {},
    chooseShipmentTemplate: null,
    countries: null,
  };

  componentDidUpdate(preProps) {
    const { transformLocale, chooseShipmentTemplate, form } = this.props;

    if (chooseShipmentTemplate !== preProps.chooseShipmentTemplate) {
      const { getFieldValue, setFields, validateFields } = form;
      const mobileValue = getFieldValue('mobile');

      if (mobileValue) {
        validateMobile(transformLocale, chooseShipmentTemplate)(
          null,
          mobileValue,
          error => {
            if (error) {
              setFields({
                mobile: {
                  value: mobileValue,
                  error: [new Error(error)],
                },
              });
              validateFields(['mobile']);
            }
          },
        );
      }
    }
  }

  render() {
    const {
      storeSetting,
      transformLocale,
      style,
      chooseShipmentTemplate,
      form,
      countries,
      invoiceIsNeeded,
    } = this.props;

    const { invoice } = storeSetting;
    const { getFieldValue, getFieldDecorator } = form;

    return (
      <React.Fragment>
        <FormItem style={style}>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
              {
                validator: validateMobile(
                  transformLocale,
                  chooseShipmentTemplate,
                ),
              },
            ],
          })(
            <Input
              placeholder={transformLocale(LOCALE.MOBILE)}
              maxLength={15}
            />,
          )}
        </FormItem>

        {chooseShipmentTemplate !== 'gmo' ? null : (
          <FormItem style={style}>
            {getFieldDecorator('idNumber', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
                {
                  validator: (rule, value, callback) => {
                    const id = (value || '').toUpperCase();

                    if (!/^[A-Z](1|2)\d{8}$/i.test(id))
                      return callback(transformLocale(LOCALE.NOT_ID_NUMBER));

                    const [engChar, ...numbers] = id;
                    const total = [
                      ...ID_NUMBER_CITY_CODE[engChar.charCodeAt(0) - 65],
                      ...numbers,
                    ].reduce(
                      (result, number, index) =>
                        result +
                        parseInt(number, 10) * ID_NUMBER_WEIGHTED[index],
                      0,
                    );

                    if (total % 10 !== 0)
                      return callback(transformLocale(LOCALE.NOT_ID_NUMBER));

                    return callback();
                  },
                },
              ],
            })(
              <Input
                placeholder={transformLocale(LOCALE.ID_NUMBER)}
                maxLength={10}
              />,
            )}
          </FormItem>
        )}

        {['allpay', 'ezship'].includes(chooseShipmentTemplate) ? (
          <FormItem style={style}>
            <ChooseShipmentStore
              form={form}
              shipmentId={getFieldValue('shipmentId')}
              shipmentTemplate={chooseShipmentTemplate}
            />
          </FormItem>
        ) : (
          <React.Fragment>
            <FormItem style={style}>
              {getFieldDecorator('address', {
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
              })(
                <AddressCascader
                  placeholder={transformLocale(LOCALE.AREA)}
                  lockedCountry={countries}
                  allowClear={false}
                />,
              )}
            </FormItem>

            {[undefined, ...Object.values(TAIWAN)].includes(
              getFieldValue('address')?.[0],
            ) ? null : (
              <FormItem style={style}>
                {getFieldDecorator('postalCode', {
                  rules: [
                    {
                      required: true,
                      message: transformLocale(LOCALE.IS_REQUIRED),
                    },
                  ],
                })(<Input placeholder={transformLocale(LOCALE.POSTAL_CODE)} />)}
              </FormItem>
            )}

            <FormItem style={style}>
              {getFieldDecorator('addressDetail', {
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
              })(<Input placeholder={transformLocale(LOCALE.ADDRESS)} />)}
            </FormItem>
          </React.Fragment>
        )}

        {!(
          invoiceIsNeeded &&
          INVOICE.some(key => invoice[key] && invoice[key].status)
        ) ? null : (
          <React.Fragment>
            <FormItem style={style}>
              {getFieldDecorator('invoice', {
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
              })(
                <Select placeholder={transformLocale(LOCALE.INVOICE)}>
                  {INVOICE.map(
                    (invoiceType, index) =>
                      !(invoice[invoiceType] || {}).status ? null : (
                        <Option key={invoiceType} value={index + 1}>
                          {transformLocale(LOCALE.INVOICE_TYPE[invoiceType])}
                        </Option>
                      ),
                  )}
                </Select>,
              )}
            </FormItem>

            <Invoice style={style} form={form} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
