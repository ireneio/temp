import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import { Form, Button, Input, notification } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

const FormItem = Form.Item;

@withTranslation('login')
@withHook(() => ({
  validateEmail: useValidateEmail(),
  client: useApolloClient(),
}))
@enhancer
export default class SendResetPswMailForm extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    dispatchAction: PropTypes.func.isRequired,

    /** props */
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    t: PropTypes.func.isRequired,
  };

  finish = ({ email }) => {
    const { client, t, cname } = this.props;

    client.mutate({
      mutation: gql`
        mutation sendResetPasswordEmailFromLogin(
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
      <Form onFinish={this.finish}>
        <h3>{t('forget-password')}</h3>

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

        <div className="button-group">
          <Button
            style={{ borderColor: colors[5] }}
            htmlType="submit"
            size="large"
          >
            {t('send-reset-password-mail')}
          </Button>
        </div>
      </Form>
    );
  }
}
