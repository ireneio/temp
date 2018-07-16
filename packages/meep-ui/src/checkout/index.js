import React from 'react';
import PropTypes from 'prop-types';

import { enhancer } from 'layout/DecoratorsRoot';
import { LOCATION_TYPE } from 'constants/propTypes';
import findDOMTop from 'utils/findDOMTop';

import OrderDetail from './orderDetail';
import Summary from './Summary';

@enhancer
export default class Checkout extends React.Component {
  static propTypes = {
    /** context */
    location: LOCATION_TYPE.isRequired,
    transformLocale: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    adTrack: PropTypes.func.isRequired,

    /** props */
    orderInfo: PropTypes.shape({}),
    products: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  };

  static defaultProps = {
    orderInfo: null,
  };

  state = {
    isSummary: false,
    // eslint-disable-next-line react/destructuring-assignment
    orderInfo: this.props.orderInfo,
    orderOtherDetailInfo: null,
  };

  componentDidMount() {
    if (global.window) {
      const { location } = this.props;

      if (location.hash !== 'choose-shipment-store') return;

      window.scrollTo(
        0,
        findDOMTop(document.getElementById('choose-shipment-store')),
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { isSummary } = this.state;

    return isSummary !== nextState.isSummary;
  }

  goToInCheckout = (info, otherDetailInfo) => {
    const { adTrack } = this.props;
    const { isSummary, orderInfo, orderOtherDetailInfo } = this.state;

    if (!isSummary) adTrack('AddPaymentInfo');

    this.setState({
      isSummary: !isSummary,
      orderInfo: !info ? orderInfo : { info },
      orderOtherDetailInfo: !otherDetailInfo
        ? orderOtherDetailInfo
        : otherDetailInfo,
    });
  };

  render() {
    const { isSummary, orderInfo, orderOtherDetailInfo } = this.state;

    if (isSummary) {
      return (
        <Summary
          {...this.props}
          orderInfo={orderInfo}
          orderOtherDetailInfo={orderOtherDetailInfo}
          goToInCheckout={this.goToInCheckout}
        />
      );
    }

    return (
      <OrderDetail
        {...this.props}
        {...orderOtherDetailInfo}
        orderInfo={orderInfo}
        goToInCheckout={this.goToInCheckout}
      />
    );
  }
}
