import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { COLOR_TYPE } from 'constants/propTypes';
import * as LOCALE from './locale';

const FormItem = Form.Item;

@Form.create()
export default class SignupForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    dispatchAction: PropTypes.func.isRequired,
    handleTypeChange: PropTypes.func.isRequired,
  };

  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = e => {
    const { confirmDirty } = this.state;

    this.setState({
      confirmDirty: confirmDirty || !!e.target.value,
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
    const { confirmDirty } = this.state;

    if (value && confirmDirty) {
      form.validateFields(['confirmPassword'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      dispatchAction,
      handleTypeChange,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        console.log('Recived values: ', values);
        const { email, newPassword: password, code: registeredCode } = values;
        dispatchAction('signup', {
          email,
          password,
          registeredCode,
          callback: handleTypeChange({ options: 'LOGIN' }),
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
      <Form onSubmit={this.handleSubmit}>
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
              type="text"
              placeholder={transformLocale(LOCALE.PROMOTION_CODE)}
              size="large"
            />,
          )}
        </FormItem>

        <div className="button-group">
          <Button
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
