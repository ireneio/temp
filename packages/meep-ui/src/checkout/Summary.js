import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { Table, Button, notification } from 'antd';
import {
  edit as EditIcon,
  tag as TagIcon,
  arrowRight as ArrowRightIcon,
} from 'react-icons/fa';

import { enhancer } from 'layout/DecoratorsRoot';
import OrderShowTotal from 'orderShowTotal';
import {
  ISLOGIN_TYPE,
  LOCATION_TYPE,
  USER_TYPE,
  COLOR_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';
import getCreateOrderQuery from 'utils/getCreateOrderQuery';
import createFormData from 'utils/createFormData';
import fetchStreamName from 'utils/fetchStreamName';

import StepHeader from './StepHeader';
import { INVOICE_FIELDS } from './constants';
import * as LOCALE from './locale';
import * as styles from './styles/summary';

@enhancer
@radium
export default class Summary extends React.PureComponent {
  formRef = React.createRef();

  productColumns = [
    {
      title: 'Img',
      dataIndex: 'galleryInfo',
      render: value => {
        const url = !value ? '' : value.media[0];

        return (
          <StyleRoot style={styles.imgWrapper}>
            <img style={styles.img} alt={url} src={`//${url}`} />
          </StyleRoot>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      width: '50%',
      render: (value, { activityInfo, specs }) => {
        const { transformLocale } = this.props;

        return (
          <>
            <div>{transformLocale(value)}</div>

            <StyleRoot style={[styles.phoneSpec, styles.activityRoot]}>
              {(specs || [])
                .map(({ title }) => transformLocale(title))
                .join('/')}
            </StyleRoot>

            {(activityInfo || []).length === 0 ? null : (
              <div style={styles.activityRoot}>
                {activityInfo.map(({ id, title, plugin }) => (
                  <div key={id} style={styles.activity}>
                    <TagIcon style={styles.tagIcon} />

                    {transformLocale(
                      plugin === 'usePoints' ? LOCALE.REWARD_POINTS : title,
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        );
      },
    },
    {
      title: 'Specs',
      dataIndex: 'specs',
      width: '50%',
      className: 'hide-in-phone',
      render: value => {
        const { transformLocale } = this.props;

        return (
          <StyleRoot style={styles.hideInPhone}>
            {(value || []).map(({ title }) => transformLocale(title)).join('/')}
          </StyleRoot>
        );
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'right',
      className: 'not-break',
    },
    {
      title: 'RetailPrice',
      dataIndex: 'retailPrice',
      align: 'right',
      className: 'not-break hide-in-phone',
      render: (value, { type }) => {
        const { transformCurrency } = this.props;

        if (type === 'gift') return '';

        return (
          <StyleRoot style={styles.hideInPhone}>
            {transformCurrency(value)}
          </StyleRoot>
        );
      },
    },
    {
      title: 'TotalPrice',
      dataIndex: 'totalPrice',
      align: 'right',
      className: 'not-break',
      render: (value, { stock, type, error }) => {
        const { colors, transformLocale, transformCurrency } = this.props;

        if (type === 'gift') {
          return (
            <div style={!error && stock > 0 ? {} : styles.giftError(colors)}>
              {transformLocale(
                !error && stock > 0 ? LOCALE.GIFT : LOCALE.GIFT_ERROR,
              )}
            </div>
          );
        }

        return transformCurrency(value);
      },
    },
  ];

  static propTypes = {
    /** context */
    user: USER_TYPE,
    cname: PropTypes.string.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    adTrack: PropTypes.func.isRequired,

    /** props */
    orderInfo: PropTypes.shape({
      info: PropTypes.shape({}).isRequired,
    }).isRequired,
    orderOtherDetailInfo: PropTypes.shape({}).isRequired,
    goToInCheckout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  state = {
    formData: null,
    isSubmitting: false,
    postalCode: '',
  };

  componentDidMount() {
    const {
      orderInfo: {
        info: { address },
      },
    } = this.props;

    if (['台灣', 'Taiwan'].includes(address?.[0])) {
      fetchStreamName(address).then(({ zip: postalCode }) => {
        this.setState({ postalCode });
      });
    }
  }

  componentDidUpdate() {
    const { formData } = this.state;

    if (formData) this.formRef.current.submit();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  getInfoData = () => {
    const { orderInfo, user, orderOtherDetailInfo } = this.props;
    const {
      products,
      priceInfo,
      activityInfo,
      paymentList,
      shipmentList,
    } = orderOtherDetailInfo;
    const { userEmail, paymentId, shipmentId } = orderInfo.info;

    return {
      products,
      priceInfo,
      activityInfo,
      userEmail: user ? user.email : userEmail,
      paymentName: paymentList.find(({ paymentId: id }) => id === paymentId)
        ?.name,
      shipmentName: shipmentList.find(({ shipmentId: id }) => id === shipmentId)
        ?.name,
    };
  };

  submit = isPayment => async () => {
    const {
      location,
      user,
      cname,
      isLogin,
      transformLocale,
      getData,
      goTo,
      adTrack,
      login,
      dispatchAction,
      orderInfo,
      orderOtherDetailInfo,
    } = this.props;
    const { postalCode } = this.state;

    this.setState({ isSubmitting: true });

    const { host: domain } = location;
    const {
      products,
      creditCardIsRegistered,
      choosePayment,
      isSaveAsReceiverTemplate,
    } = orderOtherDetailInfo;
    const { userEmail, userPassword, ...fieldValue } = orderInfo.info;
    const orderData = {
      ...fieldValue,
      postalCode,
      domain,
      userEmail: userEmail || user.email,
      userPassword,
      products,
      creditCardIsRegistered,
      choosePayment,
      isPayment,
      isSaveAsReceiverTemplate,
    };

    const result = await getData(...getCreateOrderQuery(orderData));

    if (this.isUnmounted) return;

    const { id, orderNo, error, formData } =
      result?.data?.createOrderList?.[0] || {};

    if (!id) {
      notification.error({
        message: transformLocale(LOCALE.PAY_FILE),
        description: error || '',
      });

      this.setState({ isSubmitting: false });
    } else {
      adTrack(
        'Purchase',
        {
          ...orderOtherDetailInfo,
          cname,
          orderNo,
        },
        () => {
          const nextStep = (firstPurchase = false) => {
            if (this.isUnmounted) return;
            const addRecipient = () => {
              if (!isSaveAsReceiverTemplate) return;

              dispatchAction('addRecipient', {
                recipient: {
                  yahooCode: {
                    country: fieldValue.address[0],
                    city: fieldValue.address[1] || '',
                    county: fieldValue.address[2] || '',
                    street: fieldValue.addressDetail,
                  },
                  mobile: fieldValue.mobile,
                  name: fieldValue.name,
                },
              });
            };

            if (formData && formData.url) {
              if (
                /testmaple2.neweb.com.tw\/CashSystemFrontEnd\/Query/.test(
                  formData.url,
                )
              ) {
                addRecipient();
                dispatchAction('emptyCart');
                goTo({ pathname: `/ezpay/cvcode/${id}` });
                return;
              }

              if (formData.type === 'GET') {
                window.location = formData.url;
                return;
              }

              this.setState({ formData });
              return;
            }

            addRecipient();
            dispatchAction('emptyCart');
            goTo({
              pathname: `/checkout/thank-you-page/${id}`,
              params: {
                search: { firstPurchase },
              },
            });
          };

          if (isLogin === NOTLOGIN) {
            login({
              email: userEmail,
              password: userPassword,
              callback: () => nextStep(true),
              from: 'checkout',
            });
            return;
          }

          nextStep();
        },
      );
    }
  };

  render() {
    const {
      colors,
      transformLocale,
      goToInCheckout,
      orderInfo,
      orderOtherDetailInfo,
    } = this.props;
    const { formData, isSubmitting, postalCode } = this.state;

    const {
      products,
      priceInfo,
      activityInfo,
      userEmail,
      paymentName,
      shipmentName,
    } = this.getInfoData();
    const {
      name,
      mobile,
      address,
      addressDetail,
      invoice,
      notes,
      ...fieldsValue
    } = orderInfo.info;
    const { choosePayment } = orderOtherDetailInfo;
    const { url, params } = formData || { params: {} };

    return (
      <div className="summary">
        <Style
          scopeSelector=".summary"
          rules={styles.modifyAntdStyle(colors)}
        />

        {!formData ? null : (
          <form ref={this.formRef} action={url} method="POST">
            {createFormData(
              Object.keys(params).map(key => ({
                name: key,
                value: params[key],
              })),
            )}
          </form>
        )}

        <StyleRoot style={[styles.container, styles.root]}>
          <StepHeader />

          <div style={styles.infoRoot}>
            <div>
              <div>
                {transformLocale(LOCALE.USER_EMAIL)}： {userEmail}
              </div>

              <div>
                {transformLocale(LOCALE.PAYMENT)}： {paymentName}
              </div>

              <div>
                {transformLocale(LOCALE.SHIPMENT)}： {shipmentName}
              </div>
            </div>

            <div style={styles.modify} onClick={() => goToInCheckout()}>
              <EditIcon style={styles.editIcon(colors)} />

              {transformLocale(LOCALE.MODIFY_ORDER)}
            </div>
          </div>
        </StyleRoot>

        <StyleRoot style={styles.container}>
          <Table
            columns={this.productColumns}
            dataSource={products}
            rowKey={({ cartId }) => cartId}
            title={undefined}
            showHeader={false}
            pagination={false}
          />

          <OrderShowTotal
            {...priceInfo}
            style={styles.orderShowTotal}
            activityInfo={activityInfo || []}
            isChoosenSipment
          />
        </StyleRoot>

        <StyleRoot style={[styles.container, styles.orderDetail(colors)]}>
          <div style={styles.orderItem}>
            <h4 style={styles.orderDetailTitle(colors)}>
              {transformLocale(LOCALE.RECEIVER_INFO)}
            </h4>

            <div>{name}</div>

            <div>{mobile}</div>

            <div>
              {postalCode} {(address || []).join(' / ')} {addressDetail}
            </div>
          </div>

          {!invoice ? null : (
            <div style={styles.orderItem}>
              <h4 style={styles.orderDetailTitle(colors)}>
                {transformLocale(LOCALE.INVOICE_INFO)}
              </h4>

              <div>{transformLocale(LOCALE.INVOICE[invoice - 1])}</div>

              {INVOICE_FIELDS[invoice - 1].map(
                fileName =>
                  !fieldsValue[fileName] ? null : (
                    <div key={fileName}>{fieldsValue[fileName]}</div>
                  ),
              )}
            </div>
          )}

          <div style={styles.orderItem}>
            <h4 style={styles.orderDetailTitle(colors)}>
              {transformLocale(LOCALE.NOTES)}
            </h4>

            <pre style={styles.noteContent}>{notes}</pre>
          </div>

          <div style={styles.buttonRoot}>
            {!choosePayment.paymentLater ? null : (
              <Button
                id="pay-latter"
                loading={isSubmitting}
                onClick={this.submit(false)}
              >
                {transformLocale`${LOCALE.CONFIRM}: ${LOCALE.PAY_LATER}`}
              </Button>
            )}

            <Button
              id="pay-now"
              loading={isSubmitting}
              onClick={this.submit(true)}
            >
              {choosePayment.paymentLater
                ? transformLocale`${LOCALE.CONFIRM}: ${LOCALE.PAY_NOW}`
                : transformLocale(LOCALE.CONFIRM)}

              {choosePayment.paymentLater ? null : (
                <div style={styles.arrowRightIcon}>
                  <ArrowRightIcon />
                </div>
              )}
            </Button>
          </div>
        </StyleRoot>
      </div>
    );
  }
}
