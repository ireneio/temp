import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';
import { isFullWidth, isEmail } from 'validator';

import { withTranslation } from '@store/utils/lib/i18n';

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
    forgetPassword: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
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
