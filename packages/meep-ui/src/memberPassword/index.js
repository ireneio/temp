import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { enhancer } from 'layout';
import { Row, Form, Input, Button } from 'antd';

import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles';
import * as LOCALE from './locale';

const { Item: FormItem } = Form;

@Form.create()
@enhancer
@radium
export default class MemberPassword extends React.PureComponent {
  static propTypes = {
    /** props from DecoratorsRoot */
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      getFieldsError: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
      getFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  submit = e => {
    if (e) {
      e.preventDefault();
    }
    const {
      form: { validateFields },
      dispatchAction,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { currentPassword, newPassword } = values;
        dispatchAction('changePassword', { currentPassword, newPassword });
      }
    });
  };

  confirmPassword = (rule, value, callback) => {
    const {
      form: { getFieldValue },
      transformLocale,
    } = this.props;
    if (value && value !== getFieldValue('newPassword')) {
      callback(transformLocale(LOCALE.PASSWORD_NOT_MATCH));
    }
    callback();
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldsError },
      colors,
      transformLocale,
    } = this.props;

    return (
      <StyleRoot style={styles.root}>
        <Form onSubmit={this.submit}>
          <FormItem>
            {getFieldDecorator('currentPassword', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.CURRENTPASSWORD_IS_REQUIRED),
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={transformLocale(LOCALE.CURRENTPASSWORD)}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.NEWPASSWORD_IS_REQUIRED),
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={transformLocale(LOCALE.NEWPASSWORD)}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: transformLocale(LOCALE.CONFIRMPASSWORD_IS_REQUIRED),
                },
                {
                  validator: this.confirmPassword,
                },
              ],
            })(
              <Input
                size="large"
                type="password"
                placeholder={transformLocale(LOCALE.CONFIRMPASSWORD)}
              />,
            )}
          </FormItem>
          <Row type="flex" justify="center">
            <Button
              style={styles.button(colors)}
              size="large"
              type="primary"
              htmlType="submit"
              disabled={(fieldsError =>
                Object.keys(fieldsError).some(field => fieldsError[field]))(
                getFieldsError(),
              )}
            >
              {transformLocale(LOCALE.SUBMIT)}
            </Button>
          </Row>
        </Form>
      </StyleRoot>
    );
  }
}
