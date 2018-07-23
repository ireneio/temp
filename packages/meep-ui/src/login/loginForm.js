import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

import styles from './styles/index.less';
import * as LOCALE from './locale';

const FormItem = Form.Item;

@Form.create()
export default class LoginForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleToSignup: PropTypes.func.isRequired,
    toggleToForgetPassword: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    dispatchAction: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatchAction,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;

        dispatchAction('login', { email, password });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      toggleToSignup,
      toggleToForgetPassword,
      fbLogin,
      hasStoreAppPlugin,
      transformLocale,
      colors,
    } = this.props;
    return (
      <Form className={styles.commonForm} onSubmit={this.handleSubmit}>
        <h3>{transformLocale(LOCALE.LOGIN)}</h3>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.EMAIL_IS_REQUIRED),
              },
              {
                type: 'email',
                message: transformLocale(LOCALE.IS_INVALID_EMAIL),
              },
            ],
          })(
            <Input
              className="login-form-email-input"
              placeholder={transformLocale(LOCALE.EMAIL_PLACEHOLDER)}
              size="large"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.PASSWORD_IS_REQUIRED),
              },
            ],
          })(
            <Input
              className={styles.loginFormPasswordInput}
              type="password"
              placeholder={transformLocale(LOCALE.PASSWORD_PLACEHOLDER)}
              size="large"
            />,
          )}
        </FormItem>
        <div className={styles.loginFormOptionsWrapper}>
          <div
            className="loginForm-forgetPassword-link"
            style={{ cursor: 'pointer' }}
            onClick={toggleToForgetPassword}
          >
            {transformLocale(LOCALE.FORGET_PASSWORD)}
          </div>
          <div
            className="loginForm-signup-link"
            style={{ cursor: 'pointer' }}
            onClick={toggleToSignup}
          >
            {transformLocale(LOCALE.JOIN_US)}
          </div>
        </div>
        <div className={styles.commonLoginBtnWrapper}>
          <Button
            className={styles.commonSubmitButton}
            style={{ borderColor: colors[5] }}
            htmlType="submit"
            size="large"
          >
            {transformLocale(LOCALE.LOGIN)}
          </Button>
          {hasStoreAppPlugin('fbLogin') && (
            <Button
              className={styles.loginFormFbLoginButton}
              size="large"
              onClick={fbLogin}
            >
              {transformLocale(LOCALE.FB_LOGIN)}
            </Button>
          )}
        </div>
      </Form>
    );
  }
}
