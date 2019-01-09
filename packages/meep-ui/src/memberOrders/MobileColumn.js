import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { filter } from 'graphql-anywhere';
import { Drawer, Icon } from 'antd';

import { contextProvider } from 'context';
import Link from 'link';

import Actions, { actionsFragment, actionsOrderApplyFragment } from './Actions';
import * as LOCALE from './locale';
import styles from './styles/mobileColumn.less';

const { enhancer } = contextProvider('locale');

@enhancer
export default class MobileColumn extends React.PureComponent {
  static propTypes = {
    node: PropTypes.shape({}).isRequired,
    orderApply: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  };

  state = {
    drawerVisible: false,
  };

  render() {
    const {
      /** context */
      transformLocale,

      /** props */
      node,
      orderApply,
    } = this.props;
    const { drawerVisible } = this.state;
    const { createdOn, orderNo, id, paymentInfo, shipmentInfo, status } = node;

    return (
      <div className={styles.root}>
        <div>{moment.unix(createdOn).format('YYYY/MM/DD')}</div>

        <h4>
          {transformLocale(LOCALE.ORDER_NO)}：
          <div className={styles.link}>{orderNo}</div>
        </h4>

        <div className={styles.status}>
          <div>
            <Icon type="pay-circle-o" />

            {transformLocale(LOCALE.PAYMENT[paymentInfo.status])}
          </div>

          <div>
            <Icon type="inbox" />

            {transformLocale(LOCALE.SHIPMENT[shipmentInfo.status])}
          </div>

          <div>
            <Icon type="profile" />

            {transformLocale(LOCALE.STATUS[status])}
          </div>
        </div>

        <div
          className={styles.wrapper}
          onClick={() => this.setState({ drawerVisible: true })}
        />

        <Drawer
          className={`color-3 ${styles.drawer}`}
          onClose={() => this.setState({ drawerVisible: false })}
          visible={drawerVisible}
          placement="bottom"
          closable={false}
          height="auto"
        >
          <h5 className="background-color-4">
            {transformLocale(LOCALE.ORDER_NO)}：{orderNo}
          </h5>

          <Link href={`/order/${id}`}>{transformLocale(LOCALE.DETAILS)}</Link>

          <Actions
            node={filter(actionsFragment, node)}
            orderApply={filter(actionsOrderApplyFragment, orderApply)}
          />
        </Drawer>
      </div>
    );
  }
}
