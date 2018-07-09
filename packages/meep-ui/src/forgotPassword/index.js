import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Row, Col } from 'antd';
import { StyleRoot } from 'radium';

import { enhancer } from 'layout';
import { COLOR_TYPE } from 'constants/propTypes';
import * as styles from './styles';
import * as LOCALE from './locale';

const FormItem = Form.Item;

@enhancer
@Form.create()
export default class ForgotPswForm extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    form: PropTypes.objectOf(PropTypes.func).isRequired,
    token: PropTypes.string.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
  };

  state = { status: 'INITIAL' };

  componentDidUpdate() {
    if (this.state.status === 'COMPLETED') {
      setTimeout(() => {
        this.props.goTo({ pathname: '/login' });
      }, 3000);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { token, dispatchAction } = this.props;
        const { password } = values;
        dispatchAction('resetPassword', { password, token });
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
      <Form
        style={styles.form}
        className="forget-password-form"
        onSubmit={this.handleSubmit}
      >
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
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: transformLocale(LOCALE.PASSWORD_IS_REQUIRED),
                  },
                ],
              })(
                <Input
                  className="forget-password-form-password-input"
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
            <StyleRoot style={styles.resetBtnWrapper}>
              <div style={styles.resetBtn}>
                <Button
                  className="forget-password-form-submit-button"
                  style={{ width: '100%', borderColor: colors[5] }}
                  htmlType="submit"
                  size="large"
                >
                  {transformLocale(LOCALE.RESET_PASSWORD)}
                </Button>
              </div>
            </StyleRoot>
          </Col>
        </Row>
      </Form>
    );
  }
}
