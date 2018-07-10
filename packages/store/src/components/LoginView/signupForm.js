import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import * as LOCALE from './locale';
import './styles/index.less';

const FormItem = Form.Item;

@Form.create()
export default class SignupForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    transformLocale: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    dispatchAction: PropTypes.func.isRequired,
    handleTypeChange: PropTypes.func.isRequired,
  };

  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = e => {
    this.setState({
      confirmDirty: this.state.confirmDirty || !!e.target.value,
    });
  };

  compareToFirstPassword = (_, value, callback) => {
    const { form, transformLocale } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(transformLocale(LOCALE.PASSWORD_IS_NO_MATCH));
    } else {
      callback();
    }
  };

  validateToNextPassword = (_, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Recived values: ', values);
        const { email, newPassword: password, code: registeredCode } = values;
        this.props.dispatchAction('signup', {
          email,
          password,
          registeredCode,
          callback: this.props.handleTypeChange({ options: 'LOGIN' }),
        });
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
        <h3>{transformLocale(LOCALE.SIGNUP)}</h3>
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
              className="loginView-signupForm-email-input"
              placeholder={transformLocale(LOCALE.EMAIL_PLACEHOLDER)}
              size="large"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('newPassword', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.PASSWORD_IS_REQUIRED),
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(
            <Input
              className="loginView-signupForm-newPassword-input"
              type="password"
              placeholder={transformLocale(LOCALE.PASSWORD)}
              size="large"
              onBlur={this.handleConfirmBlur}
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirmPassword', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.PASSWORD_IS_REQUIRED),
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(
            <Input
              className="loginView-signupForm-confirmPassword-input"
              type="password"
              placeholder={transformLocale(LOCALE.CONFIRM_PASSWORD)}
              size="large"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('code', {
            rules: [],
          })(
            <Input
              className="loginView-signupForm-code-input"
              type="text"
              placeholder={transformLocale(LOCALE.PROMOTION_CODE)}
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
            {transformLocale(LOCALE.JOIN)}
          </Button>
        </div>
      </Form>
    );
  }
}
