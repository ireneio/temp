import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Cascader } from 'antd';

import { withTranslation } from '@store/utils/lib/i18n';
import AddressCascader from '@store/address-cascader';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  STORE_SETTING_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
} from 'constants/propTypes';
import validateMobile, {
  validateTaiwanMobileNumber,
} from 'utils/validateMobile';

import Invoice from './Invoice';
import ChooseShipmentStore from './ChooseShipmentStore';
import getInvoiceOptions from './utils/getInvoiceOptions';

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
    invoiceIsNeeded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    style: {},
    chooseShipmentTemplate: null,
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
      i18n,
      style,
      chooseShipmentTemplate,
      form,
      shippableCountries,
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
              {getFieldDecorator('addressAndZipCode', {
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ],
              })(
                <AddressCascader
                  i18n={i18n}
                  placeholder={[t('area'), t('postal-code')]}
                  shippableCountries={shippableCountries || []}
                  allowClear={false}
                />,
              )}
            </FormItem>

            <FormItem style={style}>
              {getFieldDecorator('street', {
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
