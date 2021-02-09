import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button, Modal, notification, Icon } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import { useValidateEmail } from '@meepshop/validator';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/login';

import { formItem as formItemStyle } from './styles';

const { Item: FormItem } = Form;
const { Password } = Input;

@enhancer
@Form.create({
  mapPropsToFields: ({ email }) => ({
    email: Form.createFormField({ value: email }),
  }),
})
@withTranslation('landing-page')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withHook(() => ({
  validateEmail: useValidateEmail(),
}))
@radium
export default class Login extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    login: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    adTrack: PropTypes.shape({}).isRequired,
    form: PropTypes.shape({}).isRequired,
    hideLogin: PropTypes.func.isRequired,
  };

  state = {
    isForgetPassword: false,
  };

  submit = e => {
    e.preventDefault();
    e.stopPropagation();

    const {
      /** context */
      cname,
      login,

      /** props */
      t,
      form: { validateFields },
      hideLogin,
      adTrack,
    } = this.props;
    const { isForgetPassword } = this.state;

    validateFields((err, { email, password }) => {
      if (err) return;

      if (isForgetPassword)
        initApollo({ name: 'store' }).mutate({
          mutation: gql`
            mutation sendResetPasswordEmailFromLandingPage(
              $input: SendResetPasswordEmailInput!
            ) {
              sendResetPasswordEmail(input: $input) {
                status
              }
            }
          `,
          variables: {
            input: { email, cname, type: 'SHOPPER' },
          },
          update: (cache, { data: { sendResetPasswordEmail } }) => {
            switch (sendResetPasswordEmail.status) {
              case 'OK':
                notification.success({
                  message: t('ducks:forget-password-success'),
                });
                hideLogin();
                break;

              case 'FAIL_CANNOT_FIND_USER':
                notification.error({
                  message: t('ducks:forget-password-failure-message'),
                  description: t('ducks:cannot-find-user'),
                });
                break;

              default:
                notification.error({
                  message: t('ducks:forget-password-failure-message'),
                  description: sendResetPasswordEmail.status,
                });
                break;
            }
          },
        });
      else
        login({
          email,
          password,
          from: 'landingPage',
          callback: () => {
            hideLogin();
            adTrack.completeRegistration();
          },
        });
    });
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      t,
      form,
      hideLogin,
      validateEmail,
    } = this.props;
    const { isForgetPassword } = this.state;
    const { resetFields, getFieldDecorator } = form;

    return (
      <Modal
        title={t('plz-login')}
        footer={null}
        onCancel={hideLogin}
        maskClosable={false}
        visible
      >
        <Form style={styles.root} onSubmit={this.submit}>
          <FormItem style={formItemStyle}>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: t('is-required'),
                },
                {
                  validator: validateEmail.validator,
                },
              ],
              validateTrigger: 'onBlur',
              normalize: validateEmail.normalize,
            })(<Input placeholder={t('email')} />)}
          </FormItem>

          {isForgetPassword ? null : (
            <FormItem style={formItemStyle}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: t('is-required'),
                  },
                ],
              })(<Password placeholder={t('password')} />)}
            </FormItem>
          )}

          <div style={[formItemStyle, styles.buttonRoot]}>
            {isForgetPassword ? (
              <Button
                style={styles.button(colors)}
                type="primary"
                onClick={() => this.setState({ isForgetPassword: false })}
              >
                {t('go-back')}
              </Button>
            ) : (
              <div
                style={styles.forgetPassword}
                onClick={() => {
                  resetFields('password');
                  this.setState({ isForgetPassword: true });
                }}
              >
                <Icon type="lock" theme="filled" />

                {t('forget-password')}
              </div>
            )}

            <Button
              style={styles.button(colors)}
              type="primary"
              htmlType="submit"
            >
              {isForgetPassword ? t('send') : t('login')}
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
