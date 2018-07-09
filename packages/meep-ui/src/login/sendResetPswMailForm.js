import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row, Col } from 'antd';
import { StyleRoot } from 'radium';

import { COLOR_TYPE } from 'constants/propTypes';
import * as styles from './styles';
import * as LOCALE from './locale';

const FormItem = Form.Item;

@Form.create()
export default class SendResetPswMailForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email } = values;
        this.props.dispatchAction('forgetPassword', { email });
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
      <Form className="send-reset-password-form" onSubmit={this.handleSubmit}>
        <Row type="flex" justify="center" gutter={24}>
          <Col
            lg={{ span: 10 }}
            md={{ span: 12 }}
            sm={{ span: 14 }}
            xs={{ span: 20 }}
          >
            <h3>{transformLocale(LOCALE.FORGET_PASSWORD)}</h3>
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
                  className="send-reset-password-form-email-input"
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
            <StyleRoot style={styles.loginBtnWrapper}>
              <div style={styles.loginBtn}>
                <Button
                  className="send-reset-password-form-submit-button"
                  style={{ width: '100%', borderColor: colors[5] }}
                  htmlType="submit"
                  size="large"
                >
                  {transformLocale(LOCALE.SEND_RESET_PASSWORD_MAIL)}
                </Button>
              </div>
            </StyleRoot>
          </Col>
        </Row>
      </Form>
    );
  }
}
