import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Cascader } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import AddressCascader from 'addressCascader';
import {
  STORE_SETTING_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
  COUNTRY_TYPE,
} from 'constants/propTypes';
import validateMobile, {
  validateTaiwanMobileNumber,
} from 'utils/validateMobile';
import { TAIWAN } from 'locale/country';

import Invoice from './Invoice';
import ChooseShipmentStore from './ChooseShipmentStore';
import getInvoiceOptions from './utils/getInvoiceOptions';
import { ID_NUMBER_CITY_CODE, ID_NUMBER_WEIGHTED } from './constants';
import * as LOCALE from './locale';

const { Item: FormItem } = Form;

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

    const { getFieldValue, getFieldDecorator } = form;
    const invoiceOptions = getInvoiceOptions({ storeSetting, transformLocale });

    return (
      <>
        <FormItem
          style={style}
          extra={validateTaiwanMobileNumber(
            transformLocale,
            getFieldValue('mobile') || '',
          )}
        >
          {getFieldDecorator('mobile', {
            validateTrigger: 'onBlur',
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
              maxLength={
                ['allpay', 'ezship'].includes(chooseShipmentTemplate) ? 10 : 20
              }
            />,
          )}
        </FormItem>

        {chooseShipmentTemplate !== 'gmo' ? null : (
          <FormItem style={style}>
            {getFieldDecorator('idNumber', {
              validateTrigger: 'onBlur',
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
          <>
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
                  validateTrigger: 'onBlur',
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
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
              })(<Input placeholder={transformLocale(LOCALE.ADDRESS)} />)}
            </FormItem>
          </>
        )}

        {!invoiceIsNeeded || !invoiceOptions.length ? null : (
          <>
            <FormItem style={style}>
              {getFieldDecorator('invoice', {
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
              })(
                <Cascader
                  placeholder={transformLocale(LOCALE.INVOICE)}
                  options={invoiceOptions}
                  allowClear={false}
                />,
              )}
            </FormItem>

            <Invoice style={style} form={form} />
          </>
        )}
      </>
    );
  }
}
