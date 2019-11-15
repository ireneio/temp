import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';
import { isFullWidth, isEmail } from 'validator';

import { withTranslation } from '@store/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/forgetPassword';
import * as loginStyles from './styles/login';

const { Item: FormItem } = Form;

@withTranslation('cart')
@Form.create()
@enhancer
@radium
export default class ForgetPassword extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    forgetPassword: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      getFieldsError: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
    }).isRequired,
  };

  submit = e => {
    e.preventDefault();
    const { form, forgetPassword } = this.props;

    form.validateFields((err, { email }) => {
      if (!err) {
        forgetPassword({ email });
      }
    });
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      t,
      form: { getFieldDecorator, getFieldsError },
    } = this.props;

    return (
      <div style={[loginStyles.root, styles.root]}>
        <h3 style={loginStyles.header}>{t('forget-password')}</h3>

        <Form onSubmit={this.submit}>
          <FormItem style={loginStyles.formItem}>
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
            })(
              <Input
                style={loginStyles.input}
                placeholder={t('email-placeholder')}
                size="large"
              />,
            )}
          </FormItem>

          <div style={loginStyles.buttonRoot}>
            <div />

            <Button
              style={styles.button(colors)}
              type="primary"
              htmlType="submit"
              disabled={(fieldsError =>
                Object.keys(fieldsError).some(field => fieldsError[field]))(
                getFieldsError(),
              )}
            >
              {t('send-password')}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
