import React from 'react';
import { gql, useApolloClient } from '@apollo/client';
import PropTypes from 'prop-types';
import { Form, Button, Input, notification } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';
import { Fb as FbContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';
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
  client: useApolloClient(),
  router: useRouter(),
}))
@enhancer
export default class LoginForm extends React.PureComponent {
  state = {
    fbLoginLoading: false,
  };

  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    goTo: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    toggleToSignup: PropTypes.func.isRequired,
    toggleToForgetPassword: PropTypes.func.isRequired,
  };

  finish = async input => {
    const { t, client, router } = this.props;
    const { data } = await client.mutate({
      mutation: gql`
        mutation login($input: LoginInput!) {
          login(input: $input) @client {
            status
          }
        }
      `,
      variables: {
        input,
      },
    });

    if (data.login.status === 'OK') {
      notification.success({ message: t('ducks:login-success') });
      router.replace(window.storePreviousPageUrl || '/');
    } else
      notification.error({
        message: t('ducks:invalid-email-or-password'),
      });
  };

  render() {
    const {
      /** context */
      goTo,
      fb,
      isLoginEnabled,
      colors,

      /** props */
      t,
      toggleToSignup,
      toggleToForgetPassword,
      validateEmail,
    } = this.props;
    const { fbLoginLoading } = this.state;

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
              onClick={async () => {
                if (!fb || fbLoginLoading) return;

                this.setState({ fbLoginLoading: true });
                await fb.login(window.storePreviousPageUrl || '/');
                this.setState({ fbLoginLoading: false });
              }}
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
