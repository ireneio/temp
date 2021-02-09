import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Select, DatePicker } from 'antd';
import { isAlpha } from 'validator';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

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
const { Option } = Select;
const { TextArea } = Input;

@withTranslation('landing-page')
@withHook(({ setShowLogin }) => ({
  validateEmail: useValidateEmail(() => setShowLogin(true)),
}))
@enhancer
@radium
export default class ReceiverInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    choosePaymentTemplate: PAYMENT_TEMPLATE_TYPE,
    chooseShipmentTemplate: SHIPMENT_TEMPLATE_TYPE,
    form: PropTypes.shape({
      // from LandingPage Form.create()
      getFieldError: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,

    /** moduleProps */
    addition: ADDITION_TYPE.isRequired,
    required: REQUIRED_TYPE.isRequired,
  };

  static defaultProps = {
    choosePaymentTemplate: null,
    chooseShipmentTemplate: null,
  };

  checkedTemplate = null;

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
      form,
      addition,
      required,
      validateEmail,
    } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div style={blockStyle}>
        <h3 style={titleStyle(colors)}>{t('receiver-info')}</h3>

        <div style={styles.nameRoot}>
          <FormItem style={formItemStyle}>
            {getFieldDecorator('name', {
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
                          /[\^'`!@#%&*+$~\-(){}\\"<>|_[\] ,，\d]/.test(value) ||
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
            })(<Input placeholder={t('receiver')} />)}
          </FormItem>

          {!addition.includes('gender') ? null : (
            <FormItem style={{ ...formItemStyle, ...styles.gender }}>
              {getFieldDecorator('gender', {
                rules: [
                  {
                    required: required.includes('gender'),
                    message: t('is-required'),
                  },
                ],
              })(
                <Select placeholder={t('gender')}>
                  {['male', 'female'].map((name, index) => (
                    <Option key={name} value={index}>
                      {t(name)}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          )}
        </div>

        {!addition.includes('birthday') ? null : (
          <FormItem style={formItemStyle}>
            {getFieldDecorator('birthday', {
              rules: [
                {
                  required: required.includes('birthday'),
                  message: t('is-required'),
                },
              ],
            })(
              <DatePicker
                style={styles.birthday}
                placeholder={t('birthday')}
              />,
            )}
          </FormItem>
        )}

        {isLogin !== NOTLOGIN ? null : (
          <FormItem style={formItemStyle}>
            {getFieldDecorator('userEmail', {
              rules: [
                {
                  required: true,
                  message: t('is-required'),
                },
                {
                  validator: validateEmail.validator,
                },
              ],
              normalize: validateEmail.normalize,
            })(<Input placeholder={t('email')} />)}
          </FormItem>
        )}

        <ReceiverDefaultFormItem
          style={formItemStyle}
          form={form}
          chooseShipmentTemplate={chooseShipmentTemplate}
          shippableCountries={shippableCountries}
          invoiceIsNeeded={
            addition.includes('invoice') && choosePaymentTemplate !== 'paypal'
          }
        />

        {!addition.includes('notes') ? null : (
          <FormItem style={formItemStyle}>
            {getFieldDecorator('notes', {
              rules: [
                {
                  required: required.includes('notes'),
                  message: t('is-required'),
                },
              ],
            })(<TextArea placeholder={t('notes')} rows={4} />)}
          </FormItem>
        )}
      </div>
    );
  }
}
