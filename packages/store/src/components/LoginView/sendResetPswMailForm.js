import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import './styles/index.less';
import * as LOCALE from './locale';

const FormItem = Form.Item;

@Form.create()
export default class SendResetPswMailForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    transformLocale: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    dispatchAction: PropTypes.func.isRequired,
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
      form: { getFieldDecorator },
      transformLocale,
      colors,
    } = this.props;
    return (
      <Form className="loginView-common-form" onSubmit={this.handleSubmit}>
        <h3>{transformLocale(LOCALE.FORGET_PASSWORD)}</h3>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.EMAIL_IS_REQUIRED),
              },
              {
                type: 'email',
                message: transformLocale(LOCALE.IS_INVALID_EMAIL),
              },
            ],
          })(
            <Input
              className="loginView-sendResetPasswordForm-email-input"
              placeholder={transformLocale(LOCALE.EMAIL_PLACEHOLDER)}
              size="large"
            />,
          )}
        </FormItem>
        <div className="loginView-common-loginBtn-wrapper">
          <Button
            className="loginView-common-submitButton"
            style={{ borderColor: colors[5] }}
            htmlType="submit"
            size="large"
          >
            {transformLocale(LOCALE.SEND_RESET_PASSWORD_MAIL)}
          </Button>
        </div>
      </Form>
    );
  }
}
