import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import { Modal, Divider, Icon, message } from 'antd';
import moment from 'moment';
import warning from 'fbjs/lib/warning';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';
import createFormData from 'utils/createFormData';

import { paymentTable, PAY_AGAIN_QUERY } from './constants';
import * as styles from './styles';
import * as LOCALE from './locale';

@enhancer
@radium
export default class MemberOrderList extends React.PureComponent {
  name = 'member-order-list';

  formRef = React.createRef();

  static propTypes = {
    orderList: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
        categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        orderNo: PropTypes.string.isRequired,
        createdOn: PropTypes.number.isRequired,
        paymentInfo: PropTypes.shape({}).isRequired,
        shipmentInfo: PropTypes.shape({}).isRequired,
        status: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    orderApply: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

    /** props from context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    getData: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
  };

  state = {
    formData: null,
    visible: false,
    isLoading: false,
  };

  componentDidUpdate() {
    const { formData } = this.state;

    if (formData) this.formRef.current.submit();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handlePayAgain = async order => {
    const { isLoading } = this.state;

    if (isLoading) return;

    await this.setState({ isLoading: true });

    const { getData, transformLocale } = this.props;

    try {
      const {
        data: { paymentAgainOrderList },
        errors,
      } = await getData(PAY_AGAIN_QUERY, {
        paymentAgainOrderList: [order],
      });

      const { formData, error } = paymentAgainOrderList[0];

      if (this.isUnmounted) return;

      if (error || errors || !formData || !formData.url || !formData.params) {
        throw error || errors;
      } else {
        message.success(transformLocale(LOCALE.PAY_SUCCESS), 1, () => {
          this.setState({ formData, isLoading: false });
        });
      }
    } catch (error) {
      message.error(transformLocale(LOCALE.PAY_FAILED));
      this.setState({ formData: null, isLoading: false });
    }
  };

  showModal = order => {
    this.setState({
      visible: true,
      order,
    });
  };

  generateActions = (order, table) => {
    if (!order) return null;

    const { orderApply, transformLocale, hasStoreAppPlugin } = this.props;
    const {
      id,
      orderNo,
      status,
      paymentInfo,
      shipmentInfo,
      categories,
    } = order;
    const { accountInfo, template, paymentId } = paymentInfo.list[0];

    let actions = [];

    const choosePayment = accountInfo
      ? accountInfo[template].ChoosePayment ||
        accountInfo[template].paymentType ||
        accountInfo[template].ezpayPaymentType
      : null;

    // 判斷是否可以稍後付款
    const payLater = accountInfo
      ? paymentTable[template] && paymentTable[template][choosePayment]
      : paymentTable[template];

    // 判斷是否已有申請退換貨
    const orderApplyData = orderApply.filter(i => i.orderId === id);

    // 判斷是否有商品可以退換貨
    const orderApplyProducts = categories[0].products
      .map(product => {
        const productApplyData = orderApplyData.find(
          apply => apply.orderProductId === product.id,
        );
        if (productApplyData) {
          const { status: applyStatus } = productApplyData;
          if (applyStatus === 0 || applyStatus === 3) {
            return {
              ...product,
              quantity: 0,
            };
          }
          return {
            ...product,
            quantity: product.quantity - productApplyData.quantity,
          };
        }
        return product;
      })
      .filter(i => i.quantity && i.type !== 'gift');

    /* eslint-disable function-paren-newline */
    switch (status) {
      case 1:
      case 2:
        break;
      case 0:
      case 3:
        if (payLater && paymentInfo.status === 0) {
          // 立即付款
          actions.push(
            <span
              key="ONPAY"
              style={styles.cursor(table)}
              onClick={() => {
                this.handlePayAgain({
                  orderId: id,
                  paymentId,
                });
              }}
            >
              {transformLocale(LOCALE.ONPAY)}
            </span>,
          );
        }
        if (shipmentInfo.status === 3) {
          // 退換貨查詢
          if (orderApplyData.length) {
            actions.push(
              <Link
                key="APPLY_INFO"
                href={`/orderApplyList/${id}`}
                style={styles.cursor(table)}
              >
                {transformLocale(LOCALE.APPLY_INFO)}
              </Link>,
            );
          }
          if (orderApplyProducts.length) {
            // 退貨申請
            if (hasStoreAppPlugin('returnOrder')) {
              actions.push(
                <Link
                  key="ORDER_RETURN"
                  href={`/orderRefund/${id}`}
                  style={styles.cursor(table)}
                >
                  {transformLocale(LOCALE.ORDER_RETURN)}
                </Link>,
              );
            }
            // 換貨申請
            if (hasStoreAppPlugin('replacement')) {
              actions.push(
                <Link
                  key="ORDER_REPLACE"
                  href={`/orderExchange/${id}`}
                  style={styles.cursor(table)}
                >
                  {transformLocale(LOCALE.ORDER_REPLACE)}
                </Link>,
              );
            }
          }
        }
        break;
      default:
        warning(
          process.env.NODE_ENV === 'production',
          `Unknown [order.status] ${status}!`,
        );
        break;
    }

    if (paymentInfo.status !== 2 && template === 'custom') {
      // 匯款通知
      actions.push(
        <Link
          key="PAY_NOTI"
          href={`/payNotify/${id}`}
          style={styles.cursor(table)}
        >
          {transformLocale(LOCALE.PAY_NOTI)}
        </Link>,
      );
    }

    // 手機版配置
    actions = table
      ? actions.reduce(
          (acc, value, index) =>
            // eslint-disable-next-line react/no-array-index-key
            acc.concat([value, <Divider type="vertical" key={index} />]),
          [],
        )
      : [
          <span key="ORDER_NO">
            {`${transformLocale(LOCALE.ORDER_NO)}：${orderNo}`}
          </span>,
          <Link
            key="DETAILS"
            href={`/order/${id}`}
            style={styles.cursor(table)}
          >
            {transformLocale(LOCALE.DETAILS)}
          </Link>,
        ].concat(actions);

    // 詢問客服（必帶
    actions.push(
      <Link key="SERVICE" href={`/orderQA/${id}`} style={styles.cursor(table)}>
        {transformLocale(LOCALE.SERVICE)}
      </Link>,
    );
    /* eslint-enable function-paren-newline */

    return <span style={styles.panelWrapper}>{actions}</span>;
  };

  render() {
    const { orderList, colors, transformLocale } = this.props;
    const { formData, visible, order } = this.state;
    const { name, formRef, generateActions } = this;

    return (
      <div style={styles.root(colors)} className={name}>
        {formData && (
          <form
            ref={formRef}
            style={styles.form}
            method="POST"
            action={formData.url}
          >
            {createFormData(
              Object.keys(formData.params).map(key => ({
                name: key,
                value: formData.params[key],
              })),
            )}
          </form>
        )}
        <Style
          scopeSelector={`.${name}-modal`}
          rules={styles.modalStyle(colors)}
        />
        <Style scopeSelector={`.${name}`} rules={styles.listStyle(colors)} />
        <StyleRoot style={styles.wrapper}>
          <Modal
            className={`${name}-modal`}
            visible={visible}
            onCancel={this.handleCancel}
            footer={null}
            closable={false}
          >
            {generateActions(order)}
          </Modal>
          <div style={styles.table}>
            <div style={[styles.row(colors), styles.thead]}>
              <div style={styles.column}>{transformLocale(LOCALE.DATE)}</div>
              <div style={styles.column}>
                {transformLocale(LOCALE.ORDER_NO)}
              </div>
              <div style={styles.column}>
                {transformLocale(LOCALE.PAYMENT_TITLE)}
              </div>
              <div style={styles.column}>
                {transformLocale(LOCALE.SHIPMENT_TITLE)}
              </div>
              <div style={styles.column}>
                {transformLocale(LOCALE.STATUS_TITLE)}
              </div>
              <div style={[styles.column, styles.panel]}>
                {transformLocale(LOCALE.ACTION)}
              </div>
            </div>
            {orderList.map(orderItem => (
              <div style={styles.row(colors)} key={orderItem.id}>
                <div style={styles.main}>
                  <div style={styles.column}>
                    {moment.unix(orderItem.createdOn).format('YYYY/MM/DD')}
                  </div>
                  <div style={[styles.column, styles.orderNo]}>
                    <Link href={`/order/${orderItem.id}`}>
                      <span style={styles.showOnMobile}>
                        {transformLocale(LOCALE.ORDER_NO)}：
                      </span>
                      {orderItem.orderNo}
                    </Link>
                  </div>
                  <div style={styles.status}>
                    <span style={styles.showOnMobile}>
                      <Icon type="pay-circle-o" />
                    </span>
                    {transformLocale(
                      LOCALE.PAYMENT(orderItem.paymentInfo.status),
                    )}
                  </div>
                  <div style={styles.status}>
                    <span style={styles.showOnMobile}>
                      <Icon type="inbox" />
                    </span>
                    {transformLocale(
                      LOCALE.SHIPMENT(orderItem.shipmentInfo.status),
                    )}
                  </div>
                  <div style={styles.status}>
                    <span style={styles.showOnMobile}>
                      <Icon type="profile" />
                    </span>
                    {transformLocale(LOCALE.STATUS(orderItem.status))}
                  </div>
                  <div style={[styles.column, styles.panel]}>
                    {generateActions(orderItem, true)}
                  </div>
                </div>
                <div
                  style={styles.shadow}
                  onClick={() => {
                    this.showModal(orderItem);
                  }}
                />
              </div>
            ))}
          </div>
        </StyleRoot>
      </div>
    );
  }
}
