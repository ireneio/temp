import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import moment from 'moment';
import { Table, Divider } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import Image from 'image';
import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';
import Link from 'link';

import * as styles from './styles';
import * as LOCALE from './locale';

@enhancer
@radium
export default class MemberOrderDetails extends React.PureComponent {
  name = 'member-order-details';

  static propTypes = {
    orderDetails: PropTypes.shape({
      id: ID_TYPE.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      orderNo: PropTypes.string.isRequired,
      createdOn: PropTypes.number.isRequired,
      paymentInfo: PropTypes.shape({}).isRequired,
      userInfo: PropTypes.shape({}).isRequired,
      shipmentInfo: PropTypes.shape({}).isRequired,
      activityInfo: PropTypes.arrayOf(PropTypes.shape({})),
      priceInfo: PropTypes.shape({}).isRequired,
      invoiceInfo: PropTypes.shape({}),
      status: PropTypes.number.isRequired,
    }).isRequired,

    /** props from DecoratorsRoot */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
  };

  generateColumns = () => {
    const { transformLocale, transformCurrency } = this.props;
    return [
      {
        dataIndex: 'galleryInfo',
        render: value => (
          <StyleRoot style={styles.imgWrapper}>
            <Image
              mode="background"
              files={{
                image: value.mainId || value.media[0],
              }}
              width={80}
              contentWidth={100}
              alignment="center"
              newWindow={false}
              style={styles.img}
            />
          </StyleRoot>
        ),
      },
      {
        title: transformLocale(LOCALE.PRODUCT_TITLE),
        dataIndex: 'title',
        width: '50%',
        render: (value, record) => (
          <React.Fragment>
            <div>{transformLocale(value)}</div>
            <div className="show-on-mobile">
              {this.renderSpecs(record.specs)}
            </div>
            <div className="show-on-mobile">
              {`${transformLocale(LOCALE.PRODUCT_QUANTITY)}：${
                record.type === 'gift' && !record.stock ? 0 : record.quantity
              }`}
            </div>
          </React.Fragment>
        ),
      },
      {
        title: transformLocale(LOCALE.PRODUCT_SPEC),
        dataIndex: 'specs',
        className: 'hide-on-mobile',
        width: '50%',
        render: value => this.renderSpecs(value),
      },
      {
        title: transformLocale(LOCALE.PRODUCT_QUANTITY),
        className: 'not-break hide-on-mobile',
        align: 'center',
        dataIndex: 'quantity',
        render: (value, record) => {
          if (record.type === 'gift' && !record.stock) return 0;
          return value;
        },
      },
      {
        title: transformLocale(LOCALE.PRODUCT_PRICE),
        dataIndex: 'retailPrice',
        className: 'not-break hide-on-mobile',
        align: 'right',
        render: (value, record) => {
          if (record.type === 'gift') return transformLocale(LOCALE.GIFT);
          return transformCurrency(value);
        },
      },
      {
        title: transformLocale(LOCALE.PRODUCT_SUBTOTAL),
        dataIndex: 'retailPrice',
        className: 'not-break',
        align: 'right',
        key: 'subTotal',
        render: (value, record) => {
          if (record.type === 'gift' && record.stock)
            return transformLocale(LOCALE.GIFT);
          if (record.type === 'gift' && !record.stock)
            return transformLocale(LOCALE.NO_GIFT);
          return transformCurrency(value * record.quantity);
        },
      },
    ];
  };

  generateActivityDiscount = () => {
    const { transformLocale, transformCurrency, orderDetails } = this.props;
    const { activityInfo } = orderDetails;

    if (!activityInfo) return null;

    const activityList = activityInfo.reduce((arr, activity) => {
      /* eslint-disable no-param-reassign */
      const index = arr.findIndex(a => a.id === activity.id);
      if (index > -1) {
        arr[index].discountPrice += activity.discountPrice;
      } else {
        arr.push(activity);
      }
      return arr;
      /* eslint-enable no-param-reassign */
    }, []);

    return activityList.map(activity => {
      if (!activity.discountPrice) return null;
      let { title } = activity;
      const { id, plugin, discountPrice } = activity;

      switch (plugin) {
        case 'freeShipping':
          return null;
        case 'usePoints':
          title = LOCALE.REWARD;
          break;
        case 'productCoupon':
        case 'orderCoupon':
          title = LOCALE.COUPON;
          break;
        default:
          break;
      }
      return (
        <div key={id} style={styles.sheetItem}>
          <div>{transformLocale(title)}</div>
          <div>{transformCurrency(-discountPrice)}</div>
        </div>
      );
    });
  };

  generatePaymentInfo = () => {
    const { orderDetails, transformLocale, colors } = this.props;
    const { paymentInfo: paymentInfos, paidMessage } = orderDetails;
    const paymentInfo = paymentInfos.list[0];
    const { template, accountInfo, memo, description } = paymentInfo;

    let paymentDescription = [];

    if (template === 'allpay') {
      /* 綠界 */

      const paymentType = accountInfo && accountInfo[template].ChoosePayment;
      const paymentMemo = memo ? memo[0][template] : {};
      const {
        PaymentNo = '',
        ExpireDate = '',
        Barcode1 = '',
        Barcode2 = '',
        Barcode3 = '',
        BankCode = '',
        vAccount = '',
      } = paymentMemo;

      switch (paymentType) {
        case 'Credit':
          /* 信用卡 */
          break;
        case 'WebATM':
          /* 網路ATM轉帳 */
          break;
        case 'CVS':
          /* 超商代碼 */
          paymentDescription = paymentDescription.concat([
            <React.Fragment key="CVS">
              <span>{transformLocale(LOCALE.CVS_PAYMENT_NO) + PaymentNo}</span>
              <span>{transformLocale(LOCALE.EXPIRE_DATE) + ExpireDate}</span>
            </React.Fragment>,
          ]);
          break;
        case 'BARCODE':
          /* 超商條碼 */
          paymentDescription = paymentDescription.concat([
            <React.Fragment key="BARCODE">
              <span>
                {`${transformLocale(
                  LOCALE.BARCODE,
                )}${Barcode1} ${Barcode2} ${Barcode3}`}
              </span>
              <span>{transformLocale(LOCALE.EXPIRE_DATE) + ExpireDate}</span>
            </React.Fragment>,
          ]);
          break;
        case 'ATM':
          /* 自動櫃員機 */
          paymentDescription = paymentDescription.concat([
            <React.Fragment key="ATM">
              <span>{transformLocale(LOCALE.BANK_CODE) + BankCode}</span>
              <span>{transformLocale(LOCALE.VIRTUAL_ACCOUNT) + vAccount}</span>
              <span>{transformLocale(LOCALE.EXPIRE_DATE) + ExpireDate}</span>
            </React.Fragment>,
          ]);
          break;
        default:
          break;
      }
    } else if (template === 'hitrust') {
      /* 網際威信 */
    } else if (template === 'gmo') {
      /* GMO */

      const paymentType = accountInfo && accountInfo[template].paymentType;
      const { paymentCode = '', expireDate: expireDateUnix } = paymentInfo;
      const expireDate = expireDateUnix
        ? moment.unix(expireDateUnix).format('YYYY/MM/DD HH:mm:ss')
        : '';

      switch (paymentType) {
        case 'Credit':
          /* 信用卡(含定期購) */
          break;
        case 'KIOSK':
          /* 超商代碼 */
          paymentDescription = paymentDescription.concat([
            <React.Fragment key="KIOSK">
              <span>
                {transformLocale(LOCALE.CVS_PAYMENT_NO) + paymentCode}
              </span>
              <span>{transformLocale(LOCALE.EXPIRE_DATE) + expireDate}</span>
            </React.Fragment>,
          ]);
          break;
        case 'ATM':
          /* 自動櫃員機 */
          paymentDescription = paymentDescription.concat([
            <React.Fragment key="ATM">
              <span>
                {transformLocale(LOCALE.VIRTUAL_ACCOUNT) + paymentCode}
              </span>
              <span>{transformLocale(LOCALE.EXPIRE_DATE) + expireDate}</span>
            </React.Fragment>,
          ]);
          break;
        default:
          break;
      }
    } else if (template === 'ezpay') {
      /* 藍新 */

      const paymentType = accountInfo && accountInfo[template].ezpayPaymentType;
      const paymentMemo = memo ? memo[0][template] : {};
      const { paycode = '', expireDate: expireDateUnix } = paymentMemo;
      const expireDate = expireDateUnix
        ? moment.unix(expireDateUnix).format('YYYY/MM/DD HH:mm:ss')
        : '';

      switch (paymentType) {
        case 'Credit':
          /* 信用卡 */
          break;
        case 'WEBATM':
          /* 網路ATM轉帳 */
          break;
        case 'MMK':
          /* 超商代碼 */
          paymentDescription = paymentDescription.concat([
            <React.Fragment key="MMK">
              <span>{transformLocale(LOCALE.CVS_PAYMENT_NO) + paycode}</span>
              <span>{transformLocale(LOCALE.EXPIRE_DATE) + expireDate}</span>
            </React.Fragment>,
          ]);
          break;
        case 'CS':
          /* 超商條碼 */
          break;
        case 'ATM':
          /* 虛擬帳號轉帳 */
          break;
        default:
          break;
      }
    } else if (template === 'custom' && paidMessage && paidMessage.length) {
      /* 自訂金流 */
      paymentDescription = paymentDescription.concat([
        ...paidMessage[paidMessage.length - 1].note
          .split('\n')
          .map((note, i) => (
            <span key={`paidMessage_${i}`}>{note}</span> // eslint-disable-line react/no-array-index-key
          )),
      ]);
    }

    if (description) {
      paymentDescription = paymentDescription.concat([
        paymentDescription.length !== 0 && (
          <Divider key="Divider" style={styles.hr(colors)} />
        ),
        ...description.split('\n').map(
          (note, i) => <span key={`description_${i}`}>{note}</span>, // eslint-disable-line react/no-array-index-key
        ),
      ]);
    }

    return paymentDescription;
  };

  generateShipmentInfo = () => {
    const { orderDetails, transformLocale, colors } = this.props;
    const { shipmentInfo: shipmentInfos } = orderDetails;
    const shipmentInfo = shipmentInfos.list[0];
    let shipmentDescription = [];

    if (shipmentInfo.number) {
      shipmentDescription = shipmentDescription.concat([
        <span key="NUMBER">
          {transformLocale(LOCALE.SHIPMENT_NUMBER)}
          {shipmentInfo.number}
        </span>,
        shipmentInfo.description && (
          <Divider key="0" style={styles.hr(colors)} />
        ),
      ]);
    }
    if (shipmentInfo.recipient.receiverStoreName) {
      shipmentDescription = shipmentDescription.concat([
        <span key="NAME">
          {transformLocale(LOCALE.RECEIVER_STORE_NAME)}
          {shipmentInfo.recipient.receiverStoreName}
        </span>,
        <span key="ADDRESS">
          {transformLocale(LOCALE.RECEIVER_STORE_ADDRESS)}
          {shipmentInfo.recipient.receiverStoreAddress}
        </span>,
        shipmentInfo.description && (
          <Divider key="1" style={styles.hr(colors)} />
        ),
      ]);
    }
    if (shipmentInfo.description) {
      shipmentDescription = shipmentDescription.concat([
        ...shipmentInfo.description
          .split('\n')
          .map(i => <span key={i}>{i}</span>),
      ]);
    }

    return (
      <div style={styles.block}>
        <div style={styles.blockTitle}>
          {transformLocale(LOCALE.SHIPMENT_TYPE)}
        </div>
        <div>
          <span style={styles.blockStatus(colors)}>{shipmentInfo.name}</span>
          {shipmentInfo.storeShipmentDetails &&
            shipmentInfo.storeShipmentDetails.searchLink && (
              <Link
                href={shipmentInfo.storeShipmentDetails.searchLink}
                target="_blank"
                style={{ display: 'inline-block' }}
              >
                <span style={styles.shipmentLink(colors)}>
                  {transformLocale(LOCALE.SHIPMENT_LINK)}
                </span>
              </Link>
            )}
        </div>
        {shipmentDescription.length ? (
          <div style={styles.blockDescription(colors)}>
            {shipmentDescription}
          </div>
        ) : null}
      </div>
    );
  };

  generateInvoiceInfo = () => {
    const { orderDetails, transformLocale, colors } = this.props;

    const { invoiceInfo } = orderDetails;

    if (!invoiceInfo) return null;

    const { invoiceType } = invoiceInfo;

    if (!invoiceType) return null;

    let description;

    switch (invoiceType) {
      case 2:
        description = (
          <div style={styles.blockDescription(colors)}>
            <span>{invoiceInfo.invoiceTitle}</span>
            <span>{invoiceInfo.invoiceVAT}</span>
            <span>{invoiceInfo.streetAddress}</span>
          </div>
        );
        break;
      case 3:
        description = (
          <div style={styles.blockDescription(colors)}>
            <span>
              {transformLocale(LOCALE.VEHICLE(invoiceInfo.vehicleType))}
            </span>
            {invoiceInfo.vehicleType === 2 && (
              <span>{invoiceInfo.mobileBarcode}</span>
            )}
            {invoiceInfo.vehicleType === 3 && (
              <span>{invoiceInfo.citizenDigitalCertificate}</span>
            )}
          </div>
        );
        break;
      case 4:
        description = (
          <div style={styles.blockDescription(colors)}>
            <span>
              {transformLocale(LOCALE.DONATE_CODE) + invoiceInfo.donateUnit}
            </span>
          </div>
        );
        break;
      default:
        description = null;
    }
    return (
      <div style={styles.block}>
        <div style={styles.blockTitle}>
          {transformLocale(LOCALE.INVOICE_INFO)}
        </div>
        <div>
          <span style={styles.blockStatus(colors)}>
            {transformLocale(LOCALE.INVOICE(invoiceType))}
          </span>
        </div>
        {description}
      </div>
    );
  };

  renderSpecs = value => {
    if (!value) return null;
    const { transformLocale } = this.props;

    return value.reduce(
      (prev, curr, index) =>
        `${prev}${index ? '／' : ''}${transformLocale(curr.title)}`,
      '',
    );
  };

  render() {
    const {
      orderDetails,
      colors,
      transformLocale,
      transformCurrency,
    } = this.props;
    const {
      orderNo,
      createdOn,
      priceInfo,
      userInfo,
      activityInfo,
      shipmentInfo,
      paymentInfo,
      status,
    } = orderDetails;

    return (
      <div style={styles.root(colors)} className={this.name}>
        <Style scopeSelector={`.${this.name}`} rules={styles.Style(colors)} />
        <StyleRoot style={styles.wrapper}>
          <div style={styles.subtitle}>
            <span>{transformLocale(LOCALE.ORDER_NO) + orderNo}</span>
            <span>
              <span className="hide-on-mobile">
                {transformLocale(LOCALE.CREATED_ON)}
              </span>
              <span className="fade-on-mobile">
                {moment.unix(createdOn).format('YYYY/MM/DD')}
              </span>
            </span>
          </div>
          <div style={styles.table}>
            <Table
              rowKey="id"
              columns={this.generateColumns()}
              dataSource={orderDetails.categories[0].products}
              pagination={false}
            />
            <div style={styles.totalSheet}>
              <div style={styles.sheetItem}>
                <div>{transformLocale(LOCALE.PRODUCTS_PRICE)}</div>
                <div>{transformCurrency(priceInfo.productPrice)}</div>
              </div>
              {this.generateActivityDiscount()}
              <div style={styles.sheetItem}>
                <div>{transformLocale(LOCALE.SHIPMENT_FEE)}</div>
                <div>
                  {activityInfo &&
                  activityInfo.some(
                    activity => activity.plugin === 'freeShipping',
                  )
                    ? transformLocale(LOCALE.FREE_SHIPMENT_FEE)
                    : transformCurrency(priceInfo.shipmentFee)}
                </div>
              </div>
              {priceInfo.paymentFee ? (
                <div style={styles.sheetItem}>
                  <div>{transformLocale(LOCALE.PAYMENT_FEE)}</div>
                  <div>{transformCurrency(priceInfo.paymentFee)}</div>
                </div>
              ) : null}
              <div style={[styles.sheetItem, styles.total]}>
                <div>{transformLocale(LOCALE.TOTAL)}</div>
                <div style={styles.totalEmphasized}>
                  {transformCurrency(priceInfo.total)}
                </div>
              </div>
            </div>
          </div>
          <div style={styles.blocks}>
            <div style={styles.block}>
              <div style={styles.blockTitle}>
                {transformLocale(LOCALE.BUYER)}
              </div>
              <div style={styles.blockDescription(colors)}>
                <span>{userInfo.name}</span>
                <span>{userInfo.email}</span>
                <span>{userInfo.mobile}</span>
              </div>
            </div>
            <div style={styles.block}>
              <div style={styles.blockTitle}>
                {transformLocale(LOCALE.RECIPIENT)}
              </div>
              <div style={styles.blockDescription(colors)}>
                <span>{shipmentInfo.list[0].recipient.name}</span>
                <span>{shipmentInfo.list[0].recipient.email}</span>
                <span>{shipmentInfo.list[0].recipient.mobile}</span>
                <span>
                  {shipmentInfo.list[0].recipient.address &&
                    shipmentInfo.list[0].recipient.address.streetAddress}
                </span>
                <span>
                  {shipmentInfo.list[0].recipient.address &&
                    shipmentInfo.list[0].recipient.address.country}
                </span>
              </div>
            </div>
            <div style={styles.block}>
              <div style={styles.blockTitle}>
                {transformLocale(LOCALE.PAYMENT_STATUS)}
              </div>
              <div>
                <span style={styles.blockStatus(colors)}>
                  {transformLocale(LOCALE.PAYMENT(paymentInfo.status))}
                </span>
              </div>
            </div>
            <div style={styles.block}>
              <div style={styles.blockTitle}>
                {transformLocale(LOCALE.SHIPMENT_STATUS)}
              </div>
              <div>
                <span style={styles.blockStatus(colors)}>
                  {transformLocale(LOCALE.SHIPMENT(shipmentInfo.status))}
                </span>
              </div>
            </div>
            <div style={styles.block}>
              <div style={styles.blockTitle}>
                {transformLocale(LOCALE.PAYMENT_TYPE)}
              </div>
              <div>
                <span style={styles.blockStatus(colors)}>
                  {paymentInfo.list[0].name}
                </span>
              </div>
              <div style={styles.blockDescription(colors)}>
                {this.generatePaymentInfo()}
              </div>
            </div>
            {this.generateShipmentInfo()}
            {this.generateInvoiceInfo()}
            <div style={styles.block}>
              <div style={styles.blockTitle}>
                {transformLocale(LOCALE.ORDER_STATUS)}
              </div>
              <div>
                <span style={styles.blockStatus(colors)}>
                  {transformLocale(LOCALE.STATUS(status))}
                </span>
              </div>
              {shipmentInfo.list[0].recipient.comment && (
                <div style={styles.blockDescription(colors)}>
                  {shipmentInfo.list[0].recipient.comment.match(/.*\n/gm)
                    ? shipmentInfo.list[0].recipient.comment
                        .match(/.*\n/gm)
                        .map(str => <div>{str}</div>)
                    : shipmentInfo.list[0].recipient.comment}
                </div>
              )}
            </div>
          </div>
        </StyleRoot>
      </div>
    );
  }
}
