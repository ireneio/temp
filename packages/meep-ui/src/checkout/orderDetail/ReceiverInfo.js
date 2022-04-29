import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Checkbox } from 'antd';
import { isAlpha, isLength } from 'validator';

import { withTranslation } from '@meepshop/locales';
import Select, { Option } from '@meepshop/select';

import { enhancer } from 'layout/DecoratorsRoot';
import ReceiverDefaultFormItem from 'receiverDefaultFormItem';
import {
  ISLOGIN_TYPE,
  PAYMENT_TEMPLATE_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import styles from './styles/receiverInfo.less';

const { Item: FormItem } = Form;
const { TextArea } = Input;

@withTranslation('checkout')
@enhancer
@radium
export default class ReceiverInfo extends React.PureComponent {
  storeSaveAsTemplate = false;

  checkedTemplate = null;

  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    choosePaymentTemplate: PAYMENT_TEMPLATE_TYPE,
    chooseShipmentTemplate: SHIPMENT_TEMPLATE_TYPE,
    isSynchronizeUserInfo: PropTypes.bool.isRequired,
    changeSynchronizeUserInfo: PropTypes.func.isRequired,
    isSaveAsReceiverTemplate: PropTypes.bool.isRequired,
    changeSaveAsReceiverTemplate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    choosePaymentTemplate: null,
    chooseShipmentTemplate: null,
  };

  componentDidUpdate() {
    const {
      form: { getFieldValue, validateFields },
      chooseShipmentTemplate,
    } = this.props;

    if (
      chooseShipmentTemplate !== this.checkedTemplate &&
      getFieldValue('name')
    ) {
      validateFields(['name']);
      this.checkedTemplate = chooseShipmentTemplate;
    }
  }

  setReceiverWithTemplate = id => {
    const {
      form: { setFieldsValue },
      shippableRecipientAddresses,
    } = this.props;
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

    setFieldsValue({
      name,
      mobile,
      addressAndZipCode: {
        address: [country.id, city?.id, area?.id].filter(Boolean),
        zipCode,
      },
      street,
    });
  };

  synchronizeUserInfo = ({ target }) => {
    const {
      form: { getFieldsValue, setFieldsValue, validateFields },
      user,
      checkoutFields,
      changeSynchronizeUserInfo,
    } = this.props;

    if (target.checked) {
      const allHidden = Object.keys(checkoutFields).every(
        key => key === '__typename' || checkoutFields[key] === 'HIDDEN',
      );

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

      setFieldsValue(
        allHidden
          ? {
              name: user?.name,
              mobile: user?.additionalInfo?.mobile,
              addressAndZipCode: {
                address: [
                  user?.address?.country?.id,
                  user?.address?.city?.id,
                  user?.address?.area?.id,
                ].filter(Boolean),
                zipCode: user?.address?.zipCode,
              },
              street: user?.address?.street,
            }
          : {
              name: userName,
              mobile: userMobile,
              addressAndZipCode: userAddressAndZipCode,
              street: userStreet,
            },
      );

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
      ['blackcat', 'overseas', 'chunghwaPost', 'others'].includes(
        chooseShipmentTemplate,
      );

    if (this.storeSaveAsTemplate !== saveAsTemplate) {
      changeSaveAsReceiverTemplate(false);
    }

    this.storeSaveAsTemplate = saveAsTemplate;
    return saveAsTemplate;
  };

  validateName = async (_, value) => {
    const { t, chooseShipmentTemplate } = this.props;

    if (!value) return;

    switch (chooseShipmentTemplate) {
      case 'ezship':
        if (value.length > 60)
          throw new Error(t('name-too-long', { amount: 60 }));
        break;

      case 'gmo':
        if (value.length > 10)
          throw new Error(t('name-too-long', { amount: 10 }));
        break;

      case 'allpay':
        if (/[\^'`!@#%&*+$~\-(){}\\"<>|_[\] ,，\d]/.test(value))
          throw new Error(t('allpay-name-too-long'));

        if (isAlpha(value)) {
          if (!isLength(value, { min: 4, max: 10 }))
            throw new Error(t('allpay-name-too-long'));
        } else if (!isLength(value, { min: 2, max: 5 }))
          throw new Error(t('allpay-name-too-long'));
        break;

      default:
        break;
    }
  };

  render() {
    const {
      /** props */
      t,
      isLogin,
      checkoutFields,
      storeSetting: { shippableCountries },
      shippableRecipientAddresses,
      choosePaymentTemplate,
      chooseShipmentTemplate,
      isSynchronizeUserInfo,
      changeSaveAsReceiverTemplate,
      isSaveAsReceiverTemplate,
    } = this.props;
    const canSaveAsTemplate = this.canSaveAsTemplate();

    return (
      <div className={styles.block}>
        <h3 className={styles.title}>
          {t('receiver-info')}

          {isLogin === NOTLOGIN &&
          Object.keys(checkoutFields).every(
            key => key === '__typename' || checkoutFields[key] === 'HIDDEN',
          ) ? null : (
            <Checkbox
              onChange={this.synchronizeUserInfo}
              checked={isSynchronizeUserInfo}
            >
              {t('same-as-user-info')}
            </Checkbox>
          )}
        </h3>

        {!canSaveAsTemplate ||
        shippableRecipientAddresses.length === 0 ? null : (
          <FormItem className={styles.formItem}>
            <Select
              placeholder={t('receiver-template')}
              onChange={this.setReceiverWithTemplate}
            >
              {shippableRecipientAddresses.map(({ id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>
          </FormItem>
        )}

        <FormItem
          className={styles.formItem}
          name={['name']}
          rules={[
            {
              required: true,
              message: t('is-required'),
            },
            {
              validator: this.validateName,
            },
          ]}
          validateTrigger="onBlur"
          validateFirst
        >
          <Input placeholder={t('name')} />
        </FormItem>

        <FormItem shouldUpdate noStyle>
          {form => (
            <ReceiverDefaultFormItem
              className={styles.formItem}
              form={form}
              chooseShipmentTemplate={chooseShipmentTemplate}
              shippableCountries={shippableCountries}
              invoiceIsNeeded={choosePaymentTemplate !== 'paypal'}
            />
          )}
        </FormItem>

        <FormItem className={styles.formItem} name={['notes']}>
          <TextArea placeholder={t('notes')} rows={4} />
        </FormItem>

        {!canSaveAsTemplate ? null : (
          <div className={`${styles.formItem} ${styles.save}`}>
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
