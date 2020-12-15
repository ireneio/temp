import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button, notification } from 'antd';
import { isFullWidth, isEmail } from 'validator';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import styles from './styles/forgetPassword.less';

const { Item: FormItem } = Form;

@withTranslation('cart')
@Form.create()
@enhancer
@radium
export default class ForgetPassword extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
    }).isRequired,
  };

  submit = e => {
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
    });
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      t,
      form: { getFieldDecorator, setFields },
    } = this.props;

    return (
      <div className={styles.root}>
        <div>{t('forget-password')}</div>

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
                size="large"
                onChange={({ target: { value } }) => {
                  setFields({
                    email: {
                      value,
                    },
                  });
                }}
              />,
            )}
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
