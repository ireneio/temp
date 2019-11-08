import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { isFullWidth, isEmail } from 'validator';

import { withNamespaces } from '@store/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

const FormItem = Form.Item;

@Form.create()
@withNamespaces('login')
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
      form: { validateFields },
      dispatchAction,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { email } = values;

        dispatchAction('forgetPassword', { email });
      }
    });
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      form: { getFieldDecorator },
      t,
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
                validator: (rule, value, callback) => {
                  if (value && (isFullWidth(value) || !isEmail(value)))
                    callback(t('is-invalid-email'));
                  else callback();
                },
              },
            ],
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
