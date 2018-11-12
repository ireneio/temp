import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button, Modal, notification } from 'antd';
import { isFullWidth, isEmail } from 'validator';
import { lock as LockIcon } from 'react-icons/md';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as LOCALE from './locale';
import * as styles from './styles/login';

import { formItem as formItemStyle } from './styles';

const { Item: FormItem } = Form;
let storeEmail = null;

@enhancer
@Form.create({
  mapPropsToFields: ({ email }) => ({
    email: Form.createFormField({ value: email }),
  }),
})
@radium
export default class Login extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,

    /** ant.Form */
    form: PropTypes.shape({}).isRequired,

    /** props */
    hideLogin: PropTypes.func.isRequired,
  };

  state = {
    isForgetPassword: false,
  };

  componentWillUnmount() {
    const { form } = this.props;

    storeEmail = form.getFieldValue('email');
  }

  submit = e => {
    e.preventDefault();
    e.stopPropagation();

    const {
      transformLocale,
      login,
      forgetPassword,
      form,
      hideLogin,
    } = this.props;
    const { isForgetPassword } = this.state;

    form.validateFields((err, { email, password }) => {
      if (!err) {
        if (isForgetPassword) {
          forgetPassword({
            email,
            callback: () => {
              hideLogin();
              notification.success({
                message: transformLocale(LOCALE.SEND_SUCCESS),
              });
            },
          });
        } else {
          login({
            email,
            password,
            callback: hideLogin,
            from: 'landingPage',
          });
        }
      }
    });
  };

  render() {
    const { colors, transformLocale, form, hideLogin } = this.props;
    const { isForgetPassword } = this.state;
    const {
      resetFields,
      getFieldDecorator,
      getFieldsError,
      getFieldValue,
    } = form;

    return (
      <Modal
        title={transformLocale(LOCALE.PLZ_LOGIN)}
        footer={null}
        onCancel={hideLogin}
        visible={storeEmail !== getFieldValue('email')}
      >
        <Form style={styles.root} onSubmit={this.submit}>
          {[
            {
              name: 'email',
              placeholder: transformLocale(LOCALE.EMAIL),
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
            },
            ...(isForgetPassword
              ? []
              : [
                  {
                    name: 'password',
                    type: 'password',
                    placeholder: transformLocale(LOCALE.PASSWORD),
                    rules: [
                      {
                        required: true,
                        message: transformLocale(LOCALE.IS_REQUIRED),
                      },
                    ],
                  },
                ]),
          ].map(({ name, type, placeholder, initialValue, rules }) => (
            <FormItem key={name} style={formItemStyle}>
              {getFieldDecorator(name, { initialValue, rules })(
                <Input type={type} placeholder={placeholder} />,
              )}
            </FormItem>
          ))}

          <div style={[formItemStyle, styles.buttonRoot]}>
            {isForgetPassword ? (
              <Button
                style={styles.button(colors)}
                type="primary"
                onClick={() => this.setState({ isForgetPassword: false })}
              >
                {transformLocale(LOCALE.GO_BACK)}
              </Button>
            ) : (
              <div
                style={styles.forgetPassword}
                onClick={() => {
                  resetFields('password');
                  this.setState({ isForgetPassword: true });
                }}
              >
                <LockIcon />

                {transformLocale(LOCALE.FORGET_PASSWORD)}
              </div>
            )}

            <Button
              style={styles.button(colors)}
              type="primary"
              htmlType="submit"
              disabled={(fieldsError =>
                Object.keys(fieldsError).some(field => fieldsError[field]))(
                getFieldsError(),
              )}
            >
              {transformLocale(isForgetPassword ? LOCALE.SEND : LOCALE.LOGIN)}
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
