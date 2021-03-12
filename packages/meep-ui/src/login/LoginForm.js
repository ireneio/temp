import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import { Button, Form, Input } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';

import styles from './styles/login.less';

const FormItem = Form.Item;
const { Password } = Input;

const query = gql`
  query getFbIsLoginEnabled {
    viewer {
      id
      store {
        id
        facebookSetting {
          isLoginEnabled
        }
      }
    }
  }
`;

@Form.create()
@withTranslation('login')
@withHook(() => ({
  validateEmail: useValidateEmail(),
}))
@enhancer
export default class LoginForm extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    goTo: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired,

    /** props */
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    t: PropTypes.func.isRequired,
    toggleToSignup: PropTypes.func.isRequired,
    toggleToForgetPassword: PropTypes.func.isRequired,
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
      /** context */
      goTo,
      fbLogin,
      colors,

      /** props */
      form: { getFieldDecorator },
      t,
      toggleToSignup,
      toggleToForgetPassword,
      validateEmail,
    } = this.props;

    return (
      <Query query={query}>
        {({ data }) => {
          const isFbLoginEnabled =
            data?.viewer?.store?.facebookSetting.isLoginEnabled;

          return (
            <Form onSubmit={this.handleSubmit}>
              <h3>{t('login')}</h3>

              <FormItem>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: t('email-is-required'),
                    },
                    {
                      validator: validateEmail.validator,
                    },
                  ],
                  validateTrigger: 'onBlur',
                  normalize: validateEmail.normalize,
                })(<Input placeholder={t('email-placeholder')} size="large" />)}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: t('password-is-required'),
                    },
                  ],
                })(
                  <Password
                    placeholder={t('password-placeholder')}
                    size="large"
                  />,
                )}
              </FormItem>

              <div className={styles.optionsWrapper}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={toggleToForgetPassword}
                >
                  {t('forget-password')}
                </div>

                <div style={{ cursor: 'pointer' }} onClick={toggleToSignup}>
                  {t('join-us')}
                </div>
              </div>

              <div className="button-group">
                <Button
                  style={{ borderColor: colors[5] }}
                  htmlType="submit"
                  size="large"
                >
                  {t('login')}
                </Button>

                {isFbLoginEnabled && (
                  <Button
                    className={styles.fbLoginButton}
                    onClick={fbLogin}
                    size="large"
                  >
                    {t('fb-login')}
                  </Button>
                )}

                <Button
                  className={styles.goBackButton}
                  style={{ borderColor: colors[5] }}
                  onClick={() => goTo({ back: true })}
                  size="large"
                >
                  {t('go-back')}
                </Button>
              </div>
            </Form>
          );
        }}
      </Query>
    );
  }
}
