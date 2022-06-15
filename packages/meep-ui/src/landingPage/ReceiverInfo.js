import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input } from 'antd';
import { isAlpha, isLength } from 'validator';

import Email from '@meepshop/form-email';
import DatePicker from '@meepshop/form-date-picker';
import { withTranslation } from '@meepshop/locales';
import LoginModal from '@meepshop/login-modal';
import Select, { Option } from '@meepshop/select';

import { enhancer } from 'layout/DecoratorsRoot';
import ReceiverDefaultFormItem from 'receiverDefaultFormItem';
import {
  COLOR_TYPE,
  ISLOGIN_TYPE,
  PAYMENT_TEMPLATE_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import { ADDITION_TYPE, REQUIRED_TYPE } from './constants';
import * as styles from './styles/receiverInfo';
import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from './styles';

const { Item: FormItem } = Form;
const { TextArea } = Input;

@withTranslation('landing-page')
@enhancer
@radium
export default class ReceiverInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    choosePaymentTemplate: PAYMENT_TEMPLATE_TYPE,
    chooseShipmentTemplate: SHIPMENT_TEMPLATE_TYPE,

    /** moduleProps */
    addition: ADDITION_TYPE.isRequired,
    required: REQUIRED_TYPE.isRequired,
  };

  static defaultProps = {
    choosePaymentTemplate: null,
    chooseShipmentTemplate: null,
  };

  checkedTemplate = null;

  static getDerivedStateFromProps(nextProps, preState) {
    const { form } = nextProps;

    if (form.getFieldValue(['shipmentId']) !== preState.shipmentId) {
      form.setFieldsValue({
        CVSAddress: null,
        CVSStoreID: null,
        CVSStoreName: null,
        cvsCode: null,
        cvsType: null,
      });

      return {
        shipmentId: form.getFieldValue(['shipmentId']),
      };
    }

    return null;
  }

  componentDidUpdate() {
    const {
      form: { getFieldValue, validateFields },
      chooseShipmentTemplate,
    } = this.props;

    if (
      chooseShipmentTemplate !== this.checkedTemplate &&
      getFieldValue(['name'])
    ) {
      validateFields(['name']);
      this.checkedTemplate = chooseShipmentTemplate;
    }
  }

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

  onCloseLoginModal = () => {
    const {
      form: { setFields },
    } = this.props;

    setFields([{ name: ['userEmail'], value: '', errors: [] }]);
  };

  render() {
    const {
      /** context */
      isLogin,
      colors,

      /** props */
      t,
      choosePaymentTemplate,
      chooseShipmentTemplate,
      shippableCountries,
      addition,
      required,
    } = this.props;

    return (
      <div style={blockStyle}>
        <h3 style={titleStyle(colors)}>{t('receiver-info')}</h3>
        <div style={styles.nameRoot}>
          <FormItem
            style={formItemStyle}
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
            validateFirst
          >
            <Input placeholder={t('receiver')} />
          </FormItem>

          {!addition.includes('gender') ? null : (
            <FormItem
              style={{ ...formItemStyle, ...styles.gender }}
              name={['gender']}
              rules={[
                {
                  required: required.includes('gender'),
                  message: t('is-required'),
                },
              ]}
            >
              <Select placeholder={t('gender')}>
                {['male', 'female'].map((name, index) => (
                  <Option key={name} value={index}>
                    {t(name)}
                  </Option>
                ))}
              </Select>
            </FormItem>
          )}
        </div>
        {!addition.includes('birthday') ? null : (
          <DatePicker
            enableValidator={required.includes('birthday')}
            formItemProps={{
              name: ['birthday'],
              style: formItemStyle,
            }}
            datePickerProps={{
              style: styles.birthday,
              placeholder: t('birthday'),
            }}
          />
        )}
        {isLogin !== NOTLOGIN ? null : (
          <>
            <Email
              style={formItemStyle}
              name={['userEmail']}
              checkShopperEmail
            />

            {/** FIXME: https://github.com/ant-design/ant-design/issues/26888 */}
            <FormItem noStyle shouldUpdate>
              {({ getFieldError, getFieldValue }) =>
                !getFieldError(['userEmail']).includes(
                  t('form-email:email.already-exists'),
                ) ? null : (
                  <LoginModal
                    onClose={this.onCloseLoginModal}
                    initialEmail={getFieldValue(['userEmail'])}
                  />
                )
              }
            </FormItem>
          </>
        )}
        <FormItem shouldUpdate noStyle>
          {form => (
            <ReceiverDefaultFormItem
              style={formItemStyle}
              form={form}
              chooseShipmentTemplate={chooseShipmentTemplate}
              shippableCountries={shippableCountries}
              invoiceIsNeeded={
                addition.includes('invoice') &&
                choosePaymentTemplate !== 'paypal'
              }
            />
          )}
        </FormItem>
        {!addition.includes('notes') ? null : (
          <FormItem
            style={formItemStyle}
            name={['notes']}
            rules={[
              {
                required: required.includes('notes'),
                message: t('is-required'),
              },
            ]}
          >
            <TextArea placeholder={t('notes')} rows={4} />
          </FormItem>
        )}
      </div>
    );
  }
}
