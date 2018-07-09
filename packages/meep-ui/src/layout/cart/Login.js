import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';
import LockIcon from 'react-icons/lib/md/lock';
import ShoppingCartIcon from 'react-icons/lib/fa/shopping-cart';
import FacebookIcon from 'react-icons/lib/fa/facebook';

import { enhancer } from 'layout';
import { COLOR_TYPE } from 'constants/propTypes';

import TaiwansoapLogin from './special/TaiwansoapLogin';
import * as styles from './styles/login';
import * as LOCALE from './locale';

const { Item: FormItem } = Form;

@Form.create()
@enhancer
@radium
export default class Login extends React.PureComponent {
  static propTypes = {
    /** context */
    cname: PropTypes.string,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    toggleCart: PropTypes.func.isRequired,

    /** props */
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      getFieldsError: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
    }).isRequired,
    goToInCart: PropTypes.func.isRequired,
  };

  static defaultProps = {
    cname: null,
  };

  submit = e => {
    e.preventDefault();
    const { form, login } = this.props;

    form.validateFields((err, { email, password }) => {
      if (!err) {
        login({
          email,
          password,
          from: 'cart',
        });
      }
    });
  };

  render() {
    const {
      colors,
      cname,
      transformLocale,
      goTo,
      fbLogin,
      hasStoreAppPlugin,
      form,
      goToInCart,
      toggleCart,
    } = this.props;
    const { getFieldDecorator, getFieldsError } = form;

    return (
      <div style={styles.root}>
        <h3 style={styles.header}>{transformLocale(LOCALE.MEMBER_LOGIN)}</h3>

        <Form onSubmit={this.submit}>
          {[
            {
              name: 'email',
              placeholder: transformLocale(LOCALE.EMAIL_PLACEHOLDER),
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
            },
            {
              name: 'password',
              type: 'password',
              placeholder: transformLocale(LOCALE.PASSWORD_PLACEHOLDER),
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.PASSWORD_IS_REQUIRED),
                },
              ],
            },
          ].map(({ name, type, placeholder, rules }) => (
            <FormItem key={name} style={styles.formItem}>
              {getFieldDecorator(name, { rules })(
                <Input
                  style={styles.input}
                  type={type}
                  placeholder={placeholder}
                  size="large"
                />,
              )}
            </FormItem>
          ))}

          <div style={styles.buttonRoot}>
            <div
              style={styles.forgetPassword}
              onClick={() => goToInCart('forget password', 'login')}
            >
              <LockIcon />

              {transformLocale(LOCALE.FORGET_PASSWORD)}
            </div>

            <Button
              style={{
                ...styles.button(colors),
                ...styles.loginButton,
              }}
              type="primary"
              htmlType="submit"
              disabled={(fieldsError =>
                Object.keys(fieldsError).some(field => fieldsError[field]))(
                getFieldsError(),
              )}
              ghost
            >
              {transformLocale(LOCALE.LOGIN)}
            </Button>
          </div>
        </Form>

        {cname !== 'taiwansoap' ? null : <TaiwansoapLogin />}

        <div style={[styles.buttonRoot, styles.buttonRootExtend]}>
          <div style={styles.buttonWidth}>
            <Button
              style={styles.button(colors)}
              type="primary"
              ghost
              onClick={() => {
                toggleCart(false)();
                goTo({ pathname: '/checkout' });
              }}
            >
              <div style={styles.buttonWrapper}>
                <ShoppingCartIcon style={styles.icon(colors)} />

                <div style={styles.buttonText}>
                  {transformLocale(LOCALE.FIRST_TIME)}
                </div>
              </div>
            </Button>
          </div>

          {!hasStoreAppPlugin('fbLogin') ? null : (
            <div style={styles.buttonWidth}>
              <Button
                style={{
                  ...styles.button(colors),
                  ...styles.fbButton,
                }}
                type="primary"
                ghost
                onClick={() => fbLogin({ from: 'cart' })}
              >
                <div style={styles.buttonWrapper}>
                  <FacebookIcon
                    style={{
                      ...styles.icon(colors),
                      ...styles.fbIcon,
                    }}
                  />

                  <div style={styles.buttonText}>
                    {transformLocale(LOCALE.FB_LOGIN)}
                  </div>
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
