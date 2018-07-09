import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { enhancer } from 'layout';
import { Row, Col, Form, Input, Button } from 'antd';

import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';

import QA from './QA';

import * as styles from './styles';
import * as LOCALE from './locale';

const { Item: FormItem } = Form;
const { TextArea } = Input;

@Form.create()
@enhancer
@radium
export default class MemberOrderQA extends React.PureComponent {
  static propTypes = {
    orderDetails: PropTypes.shape({
      id: ID_TYPE.isRequired,
      orderNo: PropTypes.string.isRequired,
    }).isRequired,
    orderQA: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
        userId: ID_TYPE.isRequired,
        orderId: ID_TYPE.isRequired,
        qa: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
        orderInfo: PropTypes.shape({
          orderNo: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    ).isRequired,

    /** props from DecoratorsRoot */
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
      getFieldsError: PropTypes.func.isRequired,
      validateFields: PropTypes.func.isRequired,
      resetFields: PropTypes.func.isRequired,
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
      form: { validateFields, resetFields },
    } = this.props;
    validateFields((err, { question }) => {
      if (!err) {
        const { orderDetails, dispatchAction } = this.props;

        const orderQA = {
          orderId: orderDetails.id,
          qa: [{ question }],
        };
        dispatchAction('createOrderQA', { orderQA });
      }
    });
    resetFields();
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldsError },
      colors,
      orderQA,
      orderDetails: { orderNo },
      transformLocale,
    } = this.props;

    return (
      <div style={styles.root}>
        <StyleRoot>
          <div style={styles.content}>
            <div style={styles.orderNo}>
              {transformLocale(LOCALE.ORDER_NO) + orderNo}
            </div>
            <div style={styles.qa}>
              {orderQA.map(({ id, qa }) => <QA key={id} qa={qa} />)}
            </div>

            <div>{transformLocale(LOCALE.PLEASE_WRITE_MESSAGE)}</div>
            <Form onSubmit={this.submit}>
              <FormItem>
                {getFieldDecorator('question', {
                  rules: [
                    {
                      required: true,
                      message: transformLocale(LOCALE.MESSAGE_IS_REQUIRED),
                    },
                  ],
                })(<TextArea rows={5} style={styles.textarea} />)}
              </FormItem>
              <Row type="flex" justify="center" gutter={24}>
                <Col
                  lg={{ span: 4 }}
                  md={{ span: 4 }}
                  sm={{ span: 4 }}
                  xs={{ span: 12 }}
                >
                  <Button
                    style={styles.button(colors)}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    disabled={(fieldsError =>
                      Object.keys(fieldsError).some(
                        field => fieldsError[field],
                      ))(getFieldsError())}
                  >
                    {transformLocale(LOCALE.SEND)}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </StyleRoot>
      </div>
    );
  }
}
