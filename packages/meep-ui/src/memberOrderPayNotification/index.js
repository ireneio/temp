import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { Input, Button, Modal } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles';
import * as locale from './locale';
import { DEFAULT_MESSAGE } from './constants';

@enhancer
@radium
export default class MemberOrderPayNotification extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    orderDetails: PropTypes.shape({
      orderNo: PropTypes.string.isRequired,
      paidMessage: PropTypes.arrayOf(
        PropTypes.shape({
          note: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  state = {
    message:
      this.props.orderDetails.paidMessage &&
      this.props.orderDetails.paidMessage.length > 0
        ? this.props.orderDetails.paidMessage[
            this.props.orderDetails.paidMessage.length - 1
          ].note
        : DEFAULT_MESSAGE,
    disabled:
      this.props.orderDetails.paidMessage &&
      this.props.orderDetails.paidMessage.length > 0,
    modal: { visible: false, content: '' },
  };

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  send = async () => {
    const { transformLocale, dispatchAction, orderDetails } = this.props;
    const { id, paidMessage } = orderDetails;
    const { message } = this.state;
    const oldMessage =
      paidMessage && paidMessage.length > 0
        ? paidMessage[paidMessage.length - 1].note
        : DEFAULT_MESSAGE;

    if (message !== oldMessage) {
      dispatchAction('sendPaymentNotification', {
        id,
        paidMessage: { createData: { note: message } },
      });
      this.setState({ disabled: true });
    } else {
      this.setState({
        modal: {
          visible: true,
          content: transformLocale(locale.PLEASE_EDIT_PAY_NOTIFICATION),
        },
      });
    }
  };

  render() {
    const { colors, transformLocale, orderDetails } = this.props;
    const { message, disabled, modal } = this.state;
    const { orderNo } = orderDetails;

    return (
      <div style={styles.root}>
        <StyleRoot style={styles.container}>
          <div style={styles.banner}>
            {transformLocale(locale.ORDER_NO)} ： {orderNo}
          </div>
          <Input.TextArea
            value={message}
            rows={12}
            disabled={disabled}
            style={styles.textarea}
            onChange={this.handleMessageChange}
          />
          <div style={styles.footer}>
            {disabled ? (
              <Button
                size="large"
                style={styles.button({ color: colors[3] })}
                onClick={() => this.setState({ disabled: false })}
              >
                {transformLocale(locale.EDIT_AGAIN)}
              </Button>
            ) : (
              <Button
                size="large"
                style={styles.button({ color: colors[3] })}
                onClick={this.send}
              >
                {transformLocale(locale.SEND)}
              </Button>
            )}
          </div>
          <Modal
            visible={modal.visible}
            footer={null}
            closable
            bodyStyle={styles.modal}
            onCancel={() =>
              this.setState({ modal: { visible: false, content: '' } })
            }
          >
            {modal.content}
          </Modal>
        </StyleRoot>
      </div>
    );
  }
}
