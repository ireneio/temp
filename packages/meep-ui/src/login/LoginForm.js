import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import styles from './styles/login.less';
import * as LOCALE from './locale';

const FormItem = Form.Item;

@Form.create()
@enhancer
export default class LoginForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    goTo: PropTypes.func.isRequired,
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
      goTo,
      form: { getFieldDecorator },
      toggleToSignup,
      toggleToForgetPassword,
      fbLogin,
      hasStoreAppPlugin,
      transformLocale,
      colors,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
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
              type="password"
              placeholder={transformLocale(LOCALE.PASSWORD_PLACEHOLDER)}
              size="large"
            />,
          )}
        </FormItem>

        <div className={styles.optionsWrapper}>
          <div style={{ cursor: 'pointer' }} onClick={toggleToForgetPassword}>
            {transformLocale(LOCALE.FORGET_PASSWORD)}
          </div>
          <div style={{ cursor: 'pointer' }} onClick={toggleToSignup}>
            {transformLocale(LOCALE.JOIN_US)}
          </div>
        </div>

        <div className="button-group">
          <Button
            style={{ borderColor: colors[5] }}
            htmlType="submit"
            size="large"
          >
            {transformLocale(LOCALE.LOGIN)}
          </Button>

          {hasStoreAppPlugin('fbLogin') && (
            <Button
              className={styles.fbLoginButton}
              onClick={fbLogin}
              size="large"
            >
              {transformLocale(LOCALE.FB_LOGIN)}
            </Button>
          )}

          <Button
            className={styles.goBackButton}
            style={{ borderColor: colors[5] }}
            onClick={() => goTo({ back: true })}
            size="large"
          >
            {transformLocale(LOCALE.GO_BACK)}
          </Button>
        </div>
      </Form>
    );
  }
}
