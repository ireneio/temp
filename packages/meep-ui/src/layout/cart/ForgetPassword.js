import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/forgetPassword';
import * as loginStyles from './styles/login';
import * as LOCALE from './locale';

const { Item: FormItem } = Form;

@Form.create()
@enhancer
@radium
export default class ForgetPassword extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,
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
    const { transformLocale, colors, form } = this.props;
    const { getFieldDecorator, getFieldsError } = form;

    return (
      <div style={[loginStyles.root, styles.root]}>
        <h3 style={loginStyles.header}>
          {transformLocale(LOCALE.FORGET_PASSWORD)}
        </h3>

        <Form onSubmit={this.submit}>
          <FormItem style={loginStyles.formItem}>
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
                style={loginStyles.input}
                placeholder={transformLocale(LOCALE.EMAIL_PLACEHOLDER)}
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
              {transformLocale(LOCALE.SEND_PASSWORD)}
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
