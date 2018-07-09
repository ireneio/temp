import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row, Col } from 'antd';
import { StyleRoot } from 'radium';

import { COLOR_TYPE } from 'constants/propTypes';
import * as styles from './styles';
import * as LOCALE from './locale';

const FormItem = Form.Item;

@Form.create()
export default class SignupForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = e => {
    this.setState({
      confirmDirty: this.state.confirmDirty || !!e.target.value,
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form, transformLocale } = this.props;
    if (value && value !== form.getFieldValue('newPassword')) {
      callback(transformLocale(LOCALE.PASSWORD_IS_NO_MATCH));
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
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
      <Form className="signup-form" onSubmit={this.handleSubmit}>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 10 }}
            md={{ span: 12 }}
            sm={{ span: 14 }}
            xs={{ span: 20 }}
          >
            <h3>{transformLocale(LOCALE.SIGNUP)}</h3>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 10 }}
            md={{ span: 12 }}
            sm={{ span: 14 }}
            xs={{ span: 20 }}
          >
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
                  className="signup-form-email-input"
                  placeholder={transformLocale(LOCALE.EMAIL_PLACEHOLDER)}
                  size="large"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 10 }}
            md={{ span: 12 }}
            sm={{ span: 14 }}
            xs={{ span: 20 }}
          >
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
                  className="signup-form-new-password-input"
                  type="password"
                  placeholder={transformLocale(LOCALE.PASSWORD)}
                  size="large"
                  onBlur={this.handleConfirmBlur}
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 10 }}
            md={{ span: 12 }}
            sm={{ span: 14 }}
            xs={{ span: 20 }}
          >
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
                  className="signup-form-confirm-password-input"
                  type="password"
                  placeholder={transformLocale(LOCALE.CONFIRM_PASSWORD)}
                  size="large"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 10 }}
            md={{ span: 12 }}
            sm={{ span: 14 }}
            xs={{ span: 20 }}
          >
            <FormItem>
              {getFieldDecorator('code', {
                rules: [],
              })(
                <Input
                  className="signup-form-code-input"
                  type="text"
                  placeholder={transformLocale(LOCALE.PROMOTION_CODE)}
                  size="large"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 10 }}
            md={{ span: 12 }}
            sm={{ span: 14 }}
            xs={{ span: 20 }}
          >
            <StyleRoot style={styles.loginBtnWrapper}>
              <div style={styles.loginBtn}>
                <Button
                  className="signup-form-submit-button"
                  style={{ width: '100%', borderColor: colors[5] }}
                  htmlType="submit"
                  size="large"
                >
                  {transformLocale(LOCALE.JOIN)}
                </Button>
              </div>
            </StyleRoot>
          </Col>
        </Row>
      </Form>
    );
  }
}
