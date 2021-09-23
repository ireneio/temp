import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';
import { Fb as FbContext } from '@meepshop/context';
import withHook from '@store/utils/lib/withHook';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';

import styles from './styles/login.less';

const FormItem = Form.Item;
const { Password } = Input;

@withTranslation('login')
@withContext(FbContext)
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
    t: PropTypes.func.isRequired,
    toggleToSignup: PropTypes.func.isRequired,
    toggleToForgetPassword: PropTypes.func.isRequired,
  };

  finish = values => {
    const { dispatchAction } = this.props;

    dispatchAction('login', values);
  };

  render() {
    const {
      /** context */
      goTo,
      fbLogin,
      isLoginEnabled,
      colors,

      /** props */
      t,
      toggleToSignup,
      toggleToForgetPassword,
      validateEmail,
    } = this.props;

    return (
      <Form onFinish={this.finish}>
        <h3>{t('login')}</h3>

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

        <div className={styles.optionsWrapper}>
          <div style={{ cursor: 'pointer' }} onClick={toggleToForgetPassword}>
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

          {!isLoginEnabled ? null : (
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
  }
}
