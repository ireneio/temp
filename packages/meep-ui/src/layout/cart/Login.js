import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import { Form, Input, Button } from 'antd';
import { isFullWidth, isEmail } from 'validator';
import { MdLock as LockIcon } from 'react-icons/md';
import {
  FaShoppingCart as ShoppingCartIcon,
  FaFacebook as FacebookIcon,
} from 'react-icons/fa';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import DraftText from 'draftText';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import styles from './styles/login.less';

const { Item: FormItem } = Form;
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

@withTranslation('cart')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
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
    storeSetting: PropTypes.shape({}).isRequired,
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

      /** props */
      t,
      form,
      goToInCart,
      storeSetting: { shopperLoginMessageEnabled, shopperLoginMessage },
    } = this.props;
    const { getFieldDecorator, setFields } = form;

    return (
      <Query query={query}>
        {({ data }) => {
          const isFbLoginEnabled =
            data?.viewer?.store?.facebookSetting.isLoginEnabled;

          return (
            <div
              className={styles.root}
              style={shopperLoginMessageEnabled ? { flexGrow: 0 } : {}}
            >
              <div>{t('member-login')}</div>

              <Form onSubmit={this.submit}>
                <FormItem>
                  {getFieldDecorator('email', {
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
                    validateTrigger: false,
                    normalize: value => value.replace(/\s/g, ''),
                  })(
                    <Input
                      placeholder={t('email-placeholder')}
                      onChange={({ target: { value } }) => {
                        setFields({
                          email: {
                            value,
                          },
                        });
                      }}
                      size="large"
                    />,
                  )}
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

                <div className={styles.buttonRoot}>
                  <div onClick={() => goToInCart('forget password', 'login')}>
                    <LockIcon />
                    {t('forget-password')}
                  </div>

                  <Button
                    style={{ color: colors[3], borderColor: colors[3] }}
                    type="primary"
                    htmlType="submit"
                    ghost
                  >
                    {t('login')}
                  </Button>
                </div>
              </Form>

              <div className={styles.buttonRootExtend}>
                <div>
                  <Button
                    style={{ color: colors[3], borderColor: colors[3] }}
                    type="primary"
                    ghost
                    onClick={() => {
                      toggleCart(false)();
                      goTo({ pathname: '/checkout' });
                    }}
                  >
                    <div>
                      <ShoppingCartIcon
                        style={{ color: colors[0], backgroundColor: colors[3] }}
                      />
                      <div>{t('first-time')}</div>
                    </div>
                  </Button>
                </div>

                {!isFbLoginEnabled ? null : (
                  <div>
                    <Button
                      className={styles.fbButton}
                      ghost
                      onClick={() => fbLogin({ from: 'cart' })}
                    >
                      <div>
                        <FacebookIcon className={styles.fbIcon} />
                        <div>{t('fb-login')}</div>
                      </div>
                    </Button>
                  </div>
                )}
              </div>

              {!shopperLoginMessageEnabled || !shopperLoginMessage ? null : (
                <>
                  <div
                    className={styles.hr}
                    style={{ backgroundColor: colors[5] }}
                  />
                  <DraftText
                    style={{ padding: '0px 0px 10px 0px' }}
                    value={shopperLoginMessage}
                  />
                </>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}
