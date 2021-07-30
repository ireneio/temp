import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Cascader } from 'antd';

import { withTranslation } from '@meepshop/locales';
import AddressCascader, {
  validateAddressCascader,
} from '@meepshop/address-cascader';

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

    /** moduleProps */
    invoiceIsNeeded: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    style: {},
    chooseShipmentTemplate: null,
  };

  componentDidUpdate(preProps) {
    const {
      form: { getFieldValue, validateFields },
      chooseShipmentTemplate,
    } = this.props;

    if (
      chooseShipmentTemplate !== preProps.chooseShipmentTemplate &&
      getFieldValue(['mobile'])
    )
      validateFields(['mobile']);
  }

  render() {
    const {
      // contxt
      storeSetting,

      // props
      t,
      style,
      className,
      chooseShipmentTemplate,
      shippableCountries,
      invoiceIsNeeded,
    } = this.props;
    const invoiceOptions = getInvoiceOptions({ storeSetting, t });

    return (
      <>
        <FormItem dependencies={['mobile']} noStyle>
          {({ getFieldValue }) => (
            <FormItem
              name={['mobile']}
              className={className}
              style={style}
              extra={validateTaiwanMobileNumber(
                t,
                getFieldValue('mobile') || '',
              )}
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
                {
                  validator: validateMobile(t, chooseShipmentTemplate),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input
                placeholder={t('mobile')}
                maxLength={
                  ['allpay', 'ezship'].includes(chooseShipmentTemplate)
                    ? 10
                    : 20
                }
              />
            </FormItem>
          )}
        </FormItem>

        {['allpay', 'ezship'].includes(chooseShipmentTemplate) ? (
          <FormItem className={className} style={style}>
            <FormItem dependencies={['shipmentId']} noStyle>
              {form => (
                <ChooseShipmentStore
                  form={form}
                  shipmentId={form.getFieldValue(['shipmentId'])}
                  shipmentTemplate={chooseShipmentTemplate}
                />
              )}
            </FormItem>
          </FormItem>
        ) : (
          <>
            <FormItem
              className={className}
              style={style}
              name={['addressAndZipCode']}
              rules={[
                {
                  validator: validateAddressCascader(t('is-required')),
                },
              ]}
            >
              <AddressCascader
                placeholder={[t('area'), t('postal-code')]}
                shippableCountries={shippableCountries || []}
                allowClear={false}
              />
            </FormItem>

            <FormItem
              className={className}
              style={style}
              name={['street']}
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
              ]}
              validateTrigger="onBlur"
            >
              <Input placeholder={t('address')} />
            </FormItem>
          </>
        )}

        {!invoiceIsNeeded || !invoiceOptions.length ? null : (
          <>
            <FormItem
              className={className}
              style={style}
              name={['invoice']}
              rules={[
                {
                  required: true,
                  message: t('is-required'),
                },
              ]}
            >
              <Cascader
                placeholder={t('invoice')}
                options={invoiceOptions}
                allowClear={false}
              />
            </FormItem>

            <FormItem dependencies={['invoice']} noStyle>
              {({ getFieldValue }) => (
                <Invoice
                  className={className}
                  style={style}
                  invoice={getFieldValue(['invoice'])}
                />
              )}
            </FormItem>
          </>
        )}
      </>
    );
  }
}
