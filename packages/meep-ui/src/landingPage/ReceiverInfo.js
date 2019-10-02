import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Select, DatePicker } from 'antd';
import { isAlpha, isFullWidth, isEmail } from 'validator';

import { enhancer } from 'layout/DecoratorsRoot';
import ReceiverDefaultFormItem from 'receiverDefaultFormItem';
import {
  COLOR_TYPE,
  ISLOGIN_TYPE,
  PAYMENT_TEMPLATE_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
  COUNTRY_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import Login from './Login';
import { CHECK_USER_EMAIL, ADDITION_TYPE, REQUIRED_TYPE } from './constants';
import * as LOCALE from './locale';
import * as styles from './styles/receiverInfo';
import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from './styles';

const { Item: FormItem } = Form;
const { Option } = Select;
const { TextArea } = Input;

@enhancer
@radium
export default class ReceiverInfo extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    choosePaymentTemplate: PAYMENT_TEMPLATE_TYPE,
    chooseShipmentTemplate: SHIPMENT_TEMPLATE_TYPE,
    form: PropTypes.shape({
      // from LandingPage Form.create()
      getFieldError: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,

    /** moduleProps */
    countries: PropTypes.arrayOf(COUNTRY_TYPE.isRequired),
    addition: ADDITION_TYPE.isRequired,
    required: REQUIRED_TYPE.isRequired,
  };

  static defaultProps = {
    choosePaymentTemplate: null,
    chooseShipmentTemplate: null,
    countries: null,
  };

  state = {
    showLogin: false,
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

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  checkUserEmail = async ({ target }) => {
    const { getData, form } = this.props;
    const { getFieldError } = form;
    const { value: email } = target;

    if (getFieldError('email') || email === '') return;

    const result = await getData(CHECK_USER_EMAIL, { email });

    if (this.isUnmounted) return;

    if (result?.data?.checkUserInfo.exists) this.setState({ showLogin: true });
  };

  render() {
    const {
      isLogin,
      colors,
      transformLocale,
      choosePaymentTemplate,
      chooseShipmentTemplate,
      countries,
      form,
      addition,
      required,
    } = this.props;
    const { showLogin } = this.state;
    const { getFieldDecorator, getFieldValue } = form;

    return (
      <div style={blockStyle}>
        <h3 id="choose-shipment-store" style={titleStyle(colors)}>
          {transformLocale(LOCALE.RECEIVER_INFO)}
        </h3>

        <div style={styles.nameRoot}>
          <FormItem style={formItemStyle}>
            {getFieldDecorator('name', {
              validateFirst: true,
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
                {
                  validator: (rule, value, callback) => {
                    if (!value) callback();

                    switch (chooseShipmentTemplate) {
                      case 'ezship':
                        return callback(
                          value.length > 60
                            ? transformLocale(LOCALE.NAME_TOO_LONG(60))
                            : undefined,
                        );

                      case 'gmo':
                        return callback(
                          value.length > 10
                            ? transformLocale(LOCALE.NAME_TOO_LONG(10))
                            : undefined,
                        );

                      case 'allpay':
                        return callback(
                          /[\^'`!@#%&*+\\"<>|_[\] ,，\d]/.test(value) ||
                            (isAlpha(value)
                              ? value.length > 10 || value.length < 4
                              : value.length > 5 || value.length < 2)
                            ? transformLocale(LOCALE.ALLPAY_LNAME_TOO_LONG)
                            : undefined,
                        );

                      default:
                        return callback();
                    }
                  },
                },
              ],
            })(<Input placeholder={transformLocale(LOCALE.RECEIVER)} />)}
          </FormItem>

          {!addition.includes('gender') ? null : (
            <FormItem style={{ ...formItemStyle, ...styles.gender }}>
              {getFieldDecorator('gender', {
                rules: [
                  {
                    required: required.includes('gender'),
                    message: transformLocale(LOCALE.IS_REQUIRED),
                  },
                ],
              })(
                <Select placeholder={transformLocale(LOCALE.GENDER)}>
                  {['MALE', 'FEMALE'].map((name, index) => (
                    <Option key={name} value={index}>
                      {transformLocale(LOCALE[name])}
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
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
              ],
            })(
              <DatePicker
                style={styles.birthday}
                placeholder={transformLocale(LOCALE.BIRTHDAY)}
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
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
                {
                  validator: (rule, value, callback) => {
                    if (value && (isFullWidth(value) || !isEmail(value)))
                      callback(transformLocale(LOCALE.NOT_EMAIL));
                    else callback();
                  },
                },
              ],
            })(
              <Input
                placeholder={transformLocale(LOCALE.EMAIL)}
                onChange={() => this.setState({ showLogin: false })}
                onBlur={this.checkUserEmail}
              />,
            )}
          </FormItem>
        )}

        <ReceiverDefaultFormItem
          style={formItemStyle}
          form={form}
          chooseShipmentTemplate={chooseShipmentTemplate}
          countries={countries}
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
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
              ],
            })(
              <TextArea placeholder={transformLocale(LOCALE.NOTES)} rows={4} />,
            )}
          </FormItem>
        )}

        {isLogin !== NOTLOGIN || !showLogin ? null : (
          <Login
            hideLogin={() => this.setState({ showLogin: false })}
            email={getFieldValue('userEmail')}
          />
        )}
      </div>
    );
  }
}
