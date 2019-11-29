import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Cascader } from 'antd';

import { withTranslation } from '@store/utils/lib/i18n';

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

const { Item: FormItem } = Form;

@withTranslation(['receiver-default-form-item', 'validate-mobile'])
@enhancer
@radium
export default class ReceiverDefaultFormItem extends React.PureComponent {
  static propTypes = {
    /** context */
    storeSetting: STORE_SETTING_TYPE.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
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
    const { t, chooseShipmentTemplate, form } = this.props;

    if (chooseShipmentTemplate !== preProps.chooseShipmentTemplate) {
      const { getFieldValue, setFields, validateFields } = form;
      const mobileValue = getFieldValue('mobile');

      if (mobileValue)
        validateMobile(t, chooseShipmentTemplate)(null, mobileValue, error => {
          if (error) {
            setFields({
              mobile: {
                value: mobileValue,
                error: [new Error(error)],
              },
            });
            validateFields(['mobile']);
          }
        });
    }
  }

  render() {
    const {
      // contxt
      storeSetting,

      // props
      t,
      style,
      chooseShipmentTemplate,
      form,
      countries,
      invoiceIsNeeded,
    } = this.props;

    const { getFieldValue, getFieldDecorator } = form;
    const invoiceOptions = getInvoiceOptions({ storeSetting, t });

    return (
      <>
        <FormItem
          style={style}
          extra={validateTaiwanMobileNumber(t, getFieldValue('mobile') || '')}
        >
          {getFieldDecorator('mobile', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: validateMobile(t, chooseShipmentTemplate),
              },
            ],
          })(
            <Input
              placeholder={t('mobile')}
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
                  message: t('is-required'),
                },
                {
                  validator: (rule, value, callback) => {
                    const id = (value || '').toUpperCase();

                    if (!/^[A-Z](1|2)\d{8}$/i.test(id))
                      return callback(t('not-id-number'));

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

                    if (total % 10 !== 0) return callback(t('not-id-number'));

                    return callback();
                  },
                },
              ],
            })(<Input placeholder={t('id-number')} maxLength={10} />)}
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
                    message: t('is-required'),
                  },
                ],
              })(
                <AddressCascader
                  placeholder={t('area')}
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
                      message: t('is-required'),
                    },
                  ],
                })(<Input placeholder={t('postal-code')} />)}
              </FormItem>
            )}

            <FormItem style={style}>
              {getFieldDecorator('addressDetail', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ],
              })(<Input placeholder={t('address')} />)}
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
                    message: t('is-required'),
                  },
                ],
              })(
                <Cascader
                  placeholder={t('invoice')}
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
