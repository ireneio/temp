import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import moment from 'moment';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import ApplyList from './ApplyList';
import * as styles from './styles';
import * as locale from './locale';

@enhancer
@radium
export default class MemberOrderApplyList extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    orderDetails: PropTypes.shape({
      orderNo: PropTypes.string.isRequired,
      createdOn: PropTypes.number.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
    orderApply: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  handleApplyList = () => {
    const { orderDetails, orderApply } = this.props;
    const { products } = orderDetails.categories[0];

    const applyList = {};
    orderApply.forEach(order => {
      const detail = products.find(
        product => product.id === order.orderProductId,
      );
      applyList[order.returnId] = applyList[order.returnId] || [];
      applyList[order.returnId].push({
        orderApply: order,
        orderDetails: detail,
      });
    });
    return applyList;
  };

  render() {
    const { colors, transformLocale, orderDetails } = this.props;
    const { orderNo, createdOn } = orderDetails;
    const applyList = this.handleApplyList();

    return (
      <div style={styles.root}>
        <StyleRoot style={styles.container}>
          <div style={styles.banners({ borderColor: colors[5] })}>
            <div>
              {transformLocale(locale.ORDER_NO)} ： {orderNo}
            </div>
            <div>
              <span style={styles.orderDate}>
                {transformLocale(locale.ORDER_DATE)} ：
              </span>
              {moment.unix(createdOn).format('YYYY/MM/DD')}
            </div>
          </div>
          {Object.keys(applyList).map(key => (
            <ApplyList applyList={applyList[key]} key={key} />
          ))}
        </StyleRoot>
      </div>
    );
  }
}
