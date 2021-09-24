import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button, notification } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import styles from './styles/forgetPassword.less';

const { Item: FormItem } = Form;

@withTranslation('cart-ui')
@withHook(() => ({
  validateEmail: useValidateEmail(),
  client: useApolloClient(),
}))
@enhancer
@radium
export default class ForgetPassword extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    t: PropTypes.func.isRequired,
  };

  finish = ({ email }) => {
    const { client, t, cname } = this.props;

    client.mutate({
      mutation: gql`
        mutation sendResetPasswordEmailFromCart(
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
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      t,
      validateEmail,
    } = this.props;

    return (
      <div className={styles.root}>
        <div>{t('forget-password')}</div>

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

          <div className={styles.buttonRoot}>
            <Button
              style={{
                color: colors[2],
                borderColor: colors[4],
                backgroundColor: colors[4],
              }}
              type="primary"
              htmlType="submit"
            >
              {t('send-password')}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
