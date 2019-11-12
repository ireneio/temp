import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';
import { isFullWidth, isEmail } from 'validator';
import { lock as LockIcon } from 'react-icons/md';
import {
  shoppingCart as ShoppingCartIcon,
  facebook as FacebookIcon,
} from 'react-icons/fa';

import { withNamespaces } from '@store/utils/lib/i18n';
import withContext from '@store/utils/lib/withContext';
import adTrackContext from '@store/ad-track';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/login';

const { Item: FormItem } = Form;

@withNamespaces('cart')
@withContext(adTrackContext)
@Form.create()
@enhancer
@radium
export default class Login extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    goTo: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    toggleCart: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    adTrack: PropTypes.shape({}).isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      getFieldsError: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
    }).isRequired,
    goToInCart: PropTypes.func.isRequired,
  };

  submit = e => {
    e.preventDefault();
    const { form, login, adTrack } = this.props;

    form.validateFields((err, { email, password }) => {
      if (!err) {
        login({
          email,
          password,
          from: 'cart',
          callback: () => {
            adTrack.completeRegistration();
          },
        });
      }
    });
  };

  render() {
    const {
      /** context */
      colors,
      goTo,
      toggleCart,
      fbLogin,
      hasStoreAppPlugin,

      /** props */
      t,
      form,
      goToInCart,
    } = this.props;
    const { getFieldDecorator, getFieldsError } = form;

    return (
      <div style={styles.root}>
        <h3 style={styles.header}>{t('member-login')}</h3>

        <Form onSubmit={this.submit}>
          {[
            {
              name: 'email',
              placeholder: t('email-placeholder'),
              rules: [
                {
                  required: true,
                  message: t('email-is-required'),
                },
                {
                  validator: (rule, value, callback) => {
                    if (value && (isFullWidth(value) || !isEmail(value)))
                      callback(t('is-invalid-email'));
                    else callback();
                  },
                },
              ],
            },
            {
              name: 'password',
              type: 'password',
              placeholder: t('password-placeholder'),
              rules: [
                {
                  required: true,
                  message: t('password-is-required'),
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

              {t('forget-password')}
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
              {t('login')}
            </Button>
          </div>
        </Form>

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

                <div style={styles.buttonText}>{t('first-time')}</div>
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

                  <div style={styles.buttonText}>{t('fb-login')}</div>
                </div>
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
