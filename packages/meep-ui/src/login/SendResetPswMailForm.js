import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { Button, Form, Input, notification } from 'antd';

import { withTranslation } from '@meepshop/locales';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';
import { useValidateEmail } from '@meepshop/validator';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

const FormItem = Form.Item;

@Form.create()
@withTranslation('login')
@withHook(() => ({
  validateEmail: useValidateEmail(),
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

  handleSubmit = e => {
    e.preventDefault();

    const {
      t,
      cname,
      form: { validateFields },
    } = this.props;

    validateFields((err, { email }) => {
      if (err) return;

      initApollo({ name: 'store' }).mutate({
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
    });
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      form: { getFieldDecorator },
      t,
      validateEmail,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <h3>{t('forget-password')}</h3>

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
