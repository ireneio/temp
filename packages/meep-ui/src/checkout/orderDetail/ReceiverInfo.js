import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Select, Checkbox } from 'antd';
import { isAlpha } from 'validator';

import { withTranslation } from '@meepshop/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import ReceiverDefaultFormItem from 'receiverDefaultFormItem';
import {
  ISLOGIN_TYPE,
  USER_TYPE,
  PAYMENT_TEMPLATE_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import * as styles from './styles/receiverInfo';
import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from './styles';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

@withTranslation('checkout')
@enhancer
@radium
export default class ReceiverInfo extends React.PureComponent {
  storeSaveAsTemplate = false;

  checkedTemplate = null;

  static propTypes = {
    /** context */
    user: USER_TYPE,
    isLogin: ISLOGIN_TYPE.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    form: PropTypes.shape({}).isRequired,
    choosePaymentTemplate: PAYMENT_TEMPLATE_TYPE,
    chooseShipmentTemplate: SHIPMENT_TEMPLATE_TYPE,
    isSynchronizeUserInfo: PropTypes.bool.isRequired,
    changeSynchronizeUserInfo: PropTypes.func.isRequired,
    isSaveAsReceiverTemplate: PropTypes.bool.isRequired,
    changeSaveAsReceiverTemplate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
    choosePaymentTemplate: null,
    chooseShipmentTemplate: null,
  };

  componentDidUpdate() {
    const {
      chooseShipmentTemplate,
      form: { validateFields, getFieldValue },
    } = this.props;

    if (
      chooseShipmentTemplate !== this.checkedTemplate &&
      getFieldValue('name')
    ) {
      validateFields(['name'], {
        force: true,
      });
      this.checkedTemplate = chooseShipmentTemplate;
    }
  }

  setReceiverWithTemplate = async id => {
    const {
      /** props */
      form,
      shippableRecipientAddresses,
    } = this.props;
    const { setFieldsValue } = form;
    const {
      name,
      mobile,
      country,
      city,
      area,
      street,
      zipCode,
    } = shippableRecipientAddresses.find(
      ({ id: recipientId }) => recipientId === id,
    );

    await setFieldsValue({
      name,
      mobile,
      addressAndZipCode: {
        address: [country.id, city?.id, area?.id],
        zipCode,
      },
      street,
    });
  };

  synchronizeUserInfo = ({ target }) => {
    const { form, changeSynchronizeUserInfo } = this.props;

    if (target.checked) {
      const { getFieldsValue, setFieldsValue, validateFields } = form;

      const {
        userName,
        userMobile,
        userAddressAndZipCode,
        userStreet,
      } = getFieldsValue([
        'userName',
        'userMobile',
        'userAddressAndZipCode',
        'userStreet',
      ]);

      setFieldsValue({
        name: userName,
        mobile: userMobile,
        addressAndZipCode: userAddressAndZipCode,
        street: userStreet,
      });

      validateFields([
        'userName',
        'userMobile',
        'userAddressAndZipCode',
        'userStreet',
        'name',
        'mobile',
        'addressAndZipCode',
        'street',
      ]);
    }

    changeSynchronizeUserInfo(target.checked);
  };

  canSaveAsTemplate = () => {
    const {
      isLogin,
      chooseShipmentTemplate,
      changeSaveAsReceiverTemplate,
    } = this.props;
    const saveAsTemplate =
      isLogin !== NOTLOGIN &&
      chooseShipmentTemplate &&
      ['gd', 'blackcat', 'overseas', 'chunghwaPost', 'others'].includes(
        chooseShipmentTemplate,
      );

    if (this.storeSaveAsTemplate !== saveAsTemplate) {
      changeSaveAsReceiverTemplate(false);
    }

    this.storeSaveAsTemplate = saveAsTemplate;
    return saveAsTemplate;
  };

  render() {
    const {
      /** props */
      t,
      form,
      shippableCountries,
      shippableRecipientAddresses,
      choosePaymentTemplate,
      chooseShipmentTemplate,
      isSynchronizeUserInfo,
      changeSaveAsReceiverTemplate,
      isSaveAsReceiverTemplate,
    } = this.props;
    const { getFieldDecorator } = form;
    const canSaveAsTemplate = this.canSaveAsTemplate();

    return (
      <div style={blockStyle}>
        <h3
          id="choose-shipment-store"
          style={[titleStyle, styles.receiverTitle]}
        >
          {t('receiver-info')}

          <Checkbox
            onChange={this.synchronizeUserInfo}
            checked={isSynchronizeUserInfo}
          >
            {t('same-as-user-info')}
          </Checkbox>
        </h3>

        {!canSaveAsTemplate ||
        shippableRecipientAddresses.length === 0 ? null : (
          <FormItem style={formItemStyle}>
            {getFieldDecorator('receiverTemplate')(
              <Select
                placeholder={t('receiver-template')}
                onChange={this.setReceiverWithTemplate}
              >
                {shippableRecipientAddresses.map(({ id, name }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>,
            )}
          </FormItem>
        )}

        <FormItem style={formItemStyle}>
          {getFieldDecorator('name', {
            validateTrigger: 'onBlur',
            validateFirst: true,
            rules: [
              {
                required: true,
                message: t('is-required'),
              },
              {
                validator: (rule, value, callback) => {
                  if (!value) callback();

                  switch (chooseShipmentTemplate) {
                    case 'ezship':
                      return callback(
                        value.length > 60
                          ? t('name-too-long', { amount: 60 })
                          : undefined,
                      );

                    case 'gmo':
                      return callback(
                        value.length > 10
                          ? t('name-too-long', { amount: 10 })
                          : undefined,
                      );

                    case 'allpay':
                      return callback(
                        /[\^'`!@#%&*+\\"<>|_[\] ,，\d]/.test(value) ||
                          (isAlpha(value)
                            ? value.length > 10 || value.length < 4
                            : value.length > 5 || value.length < 2)
                          ? t('allpay-name-too-long')
                          : undefined,
                      );

                    default:
                      return callback();
                  }
                },
              },
            ],
          })(<Input placeholder={t('name')} />)}
        </FormItem>

        <ReceiverDefaultFormItem
          style={formItemStyle}
          form={form}
          chooseShipmentTemplate={chooseShipmentTemplate}
          shippableCountries={shippableCountries}
          invoiceIsNeeded={choosePaymentTemplate !== 'paypal'}
        />

        <FormItem style={formItemStyle}>
          {getFieldDecorator('notes')(
            <TextArea placeholder={t('notes')} rows={4} />,
          )}
        </FormItem>

        {!canSaveAsTemplate ? null : (
          <div style={[formItemStyle, styles.saveAsReceiverTemplate]}>
            <Checkbox
              onChange={({ target }) =>
                changeSaveAsReceiverTemplate(target.checked)
              }
              checked={isSaveAsReceiverTemplate}
            >
              {t('save-as-receiver-template')}
            </Checkbox>
          </div>
        )}
      </div>
    );
  }
}
