import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { LockFilled } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext, Fb as FbContext } from '@meepshop/context';
import {
  menuIconsShoppingCart_react as ShoppingCartIcon,
  facebook_react as FacebookIcon,
} from '@meepshop/images';
import DraftText from '@meepshop/draft-text';
import { useValidateEmail } from '@meepshop/validator';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import styles from './styles/login.less';

const { Item: FormItem } = Form;
const { Password } = Input;

@withTranslation('cart-ui')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withContext(FbContext)
@withHook(() => ({
  validateEmail: useValidateEmail(),
}))
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
    goToInCart: PropTypes.func.isRequired,
    storeSetting: PropTypes.shape({}).isRequired,
  };

  finish = values => {
    const { login, adTrack, toggleCart } = this.props;

    login({
      ...values,
      from: 'cart',
      callback: () => {
        toggleCart(false);
        adTrack.completeRegistration();
      },
    });
  };

  render() {
    const {
      /** context */
      colors,
      goTo,
      toggleCart,
      fbLogin,
      isLoginEnabled,

      /** props */
      t,
      goToInCart,
      storeSetting: { shopperLoginMessageEnabled, shopperLoginMessage },
      validateEmail,
    } = this.props;

    return (
      <div
        className={styles.root}
        style={shopperLoginMessageEnabled ? { flexGrow: 0 } : {}}
      >
        <div>{t('member-login')}</div>

        <Form onFinish={this.finish}>
          <FormItem
            name={['email']}
            rules={[
              {
                required: true,
                message: t('email-is-required'),
              },
              {
                validator: validateEmail.validator,
              },
            ]}
            normalize={validateEmail.normalize}
            validateTrigger="onBlur"
          >
            <Input placeholder={t('email-placeholder')} size="large" />
          </FormItem>

          <FormItem
            name={['password']}
            rules={[
              {
                required: true,
                message: t('password-is-required'),
              },
            ]}
          >
            <Password placeholder={t('password-placeholder')} size="large" />
          </FormItem>

          <div className={styles.buttonRoot}>
            <div onClick={() => goToInCart('forget password', 'login')}>
              <LockFilled />
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
                toggleCart(false);
                goTo({ pathname: '/checkout' });
              }}
            >
              <div>
                <ShoppingCartIcon
                  style={{ fill: colors[0], backgroundColor: colors[3] }}
                />
                <div>{t('first-time')}</div>
              </div>
            </Button>
          </div>

          {!isLoginEnabled ? null : (
            <div>
              <Button
                className={styles.fbButton}
                onClick={() => {
                  fbLogin({ to: '/checkout' });
                  toggleCart(false);
                }}
                ghost
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
            <div className={styles.hr} style={{ backgroundColor: colors[5] }} />
            <DraftText
              className={styles.loginMessage}
              content={shopperLoginMessage}
            />
          </>
        )}
      </div>
    );
  }
}
