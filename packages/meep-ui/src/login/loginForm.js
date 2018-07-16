import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row, Col } from 'antd';
import { StyleRoot } from 'radium';

import { COLOR_TYPE } from 'constants/propTypes';
import * as styles from './styles';
import * as LOCALE from './locale';

const FormItem = Form.Item;

@Form.create()
export default class LoginForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    toggleToSignup: PropTypes.func.isRequired,
    toggleToForgetPassword: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    dispatchAction: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired,
    isFBLoginInstalled: PropTypes.bool.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      form: { validateFields },
      dispatchAction,
    } = this.props;

    validateFields((err, values) => {
      if (!err) {
        const { email, password } = values;
        dispatchAction('login', { email, password });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      toggleToSignup,
      toggleToForgetPassword,
      transformLocale,
      fbLogin,
      isFBLoginInstalled,
      colors,
    } = this.props;
    return (
      <Form className="login-form" onSubmit={this.handleSubmit}>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 10 }}
            md={{ span: 12 }}
            sm={{ span: 14 }}
            xs={{ span: 20 }}
          >
            <h3>{transformLocale(LOCALE.LOGIN)}</h3>
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
                  className="login-form-email-input"
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
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.PASSWORD_IS_REQUIRED),
                  },
                ],
              })(
                <Input
                  className="login-form-password-input"
                  type="password"
                  placeholder={transformLocale(LOCALE.PASSWORD_PLACEHOLDER)}
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
            <div style={styles.optionsWrapper}>
              <div
                className="login-form-forget-password-link"
                style={{ cursor: 'pointer' }}
                onClick={toggleToForgetPassword}
              >
                {transformLocale(LOCALE.FORGET_PASSWORD)}
              </div>
              <div
                className="login-form-signup-link"
                style={{ cursor: 'pointer' }}
                onClick={toggleToSignup}
              >
                {transformLocale(LOCALE.JOIN_US)}
              </div>
            </div>
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
                  className="login-form-submit-button"
                  style={{ width: '100%', borderColor: colors[5] }}
                  htmlType="submit"
                  size="large"
                >
                  {transformLocale(LOCALE.LOGIN)}
                </Button>
              </div>
              {isFBLoginInstalled && (
                <div style={styles.loginBtn}>
                  <Button
                    className="login-form-submit-button"
                    style={{ width: '100%' }}
                    size="large"
                    onClick={fbLogin}
                  >
                    {transformLocale(LOCALE.FB_LOGIN)}
                  </Button>
                </div>
              )}
            </StyleRoot>
          </Col>
        </Row>
      </Form>
    );
  }
}
