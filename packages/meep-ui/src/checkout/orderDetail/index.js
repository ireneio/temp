import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { Form, InputNumber, Button, Modal } from 'antd';
import uuid from 'uuid';
import { chevronLeft as ChevronLeftIcon } from 'react-icons/md';
import transformColor from 'color';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  COLOR_TYPE,
  COUNTRY_TYPE,
  STORE_SETTING_TYPE,
} from 'constants/propTypes';
import getComputeOrderQuery from 'utils/getComputeOrderQuery';

import PaymentDefaultFormItem from 'paymentDefaultFormItem';
import CreditCardFormItem from 'creditCardFormItem';

import StepHeader from '../StepHeader';

import UserInfo from './UserInfo';
import ReceiverInfo from './ReceiverInfo';
import ProductList from './ProductList';
import * as LOCALE from './locale';
import styles from './styles/index.less';
import { modifyAntdStyle, formItem as formItemStyle } from './styles';

const { Item: FormItem } = Form;

@Form.create({
  mapPropsToFields: ({ user, orderInfo }) => {
    const { info, ...data } = orderInfo || {};
    const { name: userName, additionalInfo = {} } = user || {};
    const { mobile: userMobile } = additionalInfo;
    const fieldsData = {
      userName,
      userMobile,
      ...data,
      ...(info || {}),
    };

    return Object.keys(fieldsData).reduce(
      (fileds, key) => ({
        ...fileds,
        [key]: Form.createFormField({ value: fieldsData[key] }),
      }),
      {},
    );
  },
})
@enhancer
@radium
export default class OrderDetail extends React.PureComponent {
  isEmptyCart = false;

  isPayment = true;

  cacheResult = [];

  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,

    /** props */
    countries: PropTypes.arrayOf(COUNTRY_TYPE.isRequired),
    products: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    creditCardIsRegistered: PropTypes.bool,
    isSynchronizeUserInfo: PropTypes.bool,
    isSaveAsReceiverTemplate: PropTypes.bool,
    form: PropTypes.shape({}).isRequired,
    goToInCheckout: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    countries: null,
    creditCardIsRegistered: false,
    isSynchronizeUserInfo: false,
    isSaveAsReceiverTemplate: false,
  };

  state = {
    showDetail: false,
    computeOrderData: {
      paymentList: [],
      shipmentList: [],
    },
    // eslint-disable-next-line react/destructuring-assignment
    products: this.props.products,
    choosePayment: null,
    chooseShipment: null,
    productHasError: false,
    // eslint-disable-next-line react/destructuring-assignment
    creditCardIsRegistered: this.props.creditCardIsRegistered,
    // eslint-disable-next-line react/destructuring-assignment
    isSynchronizeUserInfo: this.props.isSynchronizeUserInfo,
    // eslint-disable-next-line react/destructuring-assignment
    isSaveAsReceiverTemplate: this.props.isSaveAsReceiverTemplate,
    isChecking: false,
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { form } = nextProps;

    if (form) {
      const { getFieldsValue } = form;
      const { paymentId, shipmentId } = getFieldsValue([
        'paymentId',
        'shipmentId',
      ]);

      if (
        paymentId !== (preState.choosePayment || {}).paymentId ||
        shipmentId !== (preState.chooseShipment || {}).shipmentId
      ) {
        return {
          choosePayment: preState.computeOrderData.paymentList.find(
            ({ paymentId: id }) => id === paymentId,
          ),
          chooseShipment: preState.computeOrderData.shipmentList.find(
            ({ shipmentId: id }) => id === shipmentId,
          ),
        };
      }
    }

    return null;
  }

  componentDidMount() {
    this.computeOrderList();
  }

  componentDidUpdate() {
    this.checkCartIsEmpty();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  checkCartIsEmpty = () => {
    if (this.isUnmounted || this.isEmptyCart) return;

    const { transformLocale, goTo } = this.props;
    const { products } = this.state;

    if (products.length === 0) {
      this.isEmptyCart = true;
      Modal.warning({
        title: transformLocale(LOCALE.CART_IS_EMPTY),
        okText: transformLocale(LOCALE.CONFIRM_GO_TO),
        onOk: () => goTo({ pathname: '/' }),
      });
    }
  };

  computeOrderList = async (fieldsValue = {}) => {
    const { getData, form } = this.props;
    const { products } = this.state;
    const { getFieldValue } = form;
    const [paymentId, shipmentId, coupon, points] = [
      'paymentId',
      'shipmentId',
      'coupon',
      'points',
    ].map(key => fieldsValue[key] || getFieldValue(key));

    this.setState({ isChecking: true });

    const requestId = uuid();

    this.cacheResult.push({
      requestId,
    });
    this.cacheResult.find(
      ({ requestId: cacheId }) => cacheId === requestId,
    ).result = await getData(
      ...getComputeOrderQuery({
        coupon,
        points,
        paymentId,
        shipmentId,
        products: (fieldsValue.products || products).filter(
          ({ type }) => type === 'product',
        ),
      }),
    );

    const [{ result }] = this.cacheResult.slice(-1);

    if (this.isUnmounted || !result?.data?.computeOrderList) return;

    const { computeOrderList } = result.data;
    const [
      { activityInfo, priceInfo, categories, errorObj },
    ] = computeOrderList;
    const [
      { products: newProducts = [], paymentList = [], shipmentList = [] },
    ] = categories || [{}];
    const { userPoints = 0, canUsePointsLimit = 0, total = 0 } =
      priceInfo || {};

    this.setState({
      computeOrderData: {
        total,
        paymentList,
        shipmentList,
        couponInfo: { checkId: uuid.v4(), activityInfo, errorObj },
        userPoints,
        canUsePointsLimit,
        activityInfo,
        priceInfo,
      },
      products: newProducts,
      choosePayment: paymentList.find(({ paymentId: id }) => id === paymentId),
      chooseShipment: shipmentList.find(
        ({ shipmentId: id }) => id === shipmentId,
      ),
      isChecking: false,
    });
  };

  submit = e => {
    if (this.state.isChecking) return null; // eslint-disable-line

    e.preventDefault();

    const { form, goToInCheckout } = this.props;
    const {
      computeOrderData,
      products,
      choosePayment,
      creditCardIsRegistered,
      isSynchronizeUserInfo,
      isSaveAsReceiverTemplate,
    } = this.state;
    const checkProductError = products.some(
      ({ type, error }) => error && type === 'product',
    );

    if (checkProductError) return this.setState({ productHasError: true });

    const { validateFieldsAndScroll } = form;
    const {
      priceInfo,
      activityInfo,
      paymentList,
      shipmentList,
    } = computeOrderData;

    return validateFieldsAndScroll(
      {
        scroll: { offsetTop: 60 },
      },
      (err, data) => {
        if (!err) {
          goToInCheckout(this.isPayment, data, {
            priceInfo,
            activityInfo,
            paymentList,
            shipmentList,
            products,
            choosePayment,
            creditCardIsRegistered,
            isSynchronizeUserInfo,
            isSaveAsReceiverTemplate,
          });
        }
      },
    );
  };

  render() {
    const {
      colors,
      storeSetting,
      transformLocale,
      transformCurrency,
      hasStoreAppPlugin,
      goTo,
      form,
      countries,
      isSubmitting,
    } = this.props;
    const {
      showDetail,
      products,
      computeOrderData,
      chooseShipment,
      choosePayment,
      productHasError,
      isSynchronizeUserInfo,
      isSaveAsReceiverTemplate,
      isChecking,
    } = this.state;

    const { storeName } = storeSetting;
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldValue,
      validateFieldsAndScroll,
    } = form;
    const {
      total,
      paymentList,
      shipmentList,
      couponInfo,
      userPoints,
      canUsePointsLimit,
      activityInfo,
      priceInfo,
    } = computeOrderData;
    const { paymentLater } = choosePayment || {};

    return (
      <StyleRoot className={styles.root} style={{ background: colors[0] }}>
        <Style
          scopeSelector={`.${styles.root}`}
          rules={modifyAntdStyle(colors)}
        />

        <Form className={styles.fields} onSubmit={this.submit}>
          <div className={styles.wrapper}>
            <StepHeader />

            <div className={styles.phoneSizeInfo}>
              {storeName}

              <div className={styles.phoneSizeWrapper}>
                {transformLocale(LOCALE.TOTAL_PRICE)}：
                {transformCurrency(total)}
                <Button onClick={() => this.setState({ showDetail: true })}>
                  {transformLocale(LOCALE.CHECK_DETAIL)}
                </Button>
              </div>
            </div>

            <div className={styles.block}>
              <h3 className={styles.title}>
                {transformLocale(LOCALE.PAYMENT_INFO)}
              </h3>

              <PaymentDefaultFormItem
                style={formItemStyle}
                form={form}
                computeOrderList={this.computeOrderList}
                paymentList={paymentList}
                shipmentList={shipmentList}
                couponInfo={couponInfo}
              />

              {!(hasStoreAppPlugin('points') && userPoints > 0) ? null : (
                <FormItem className={styles.formItem}>
                  {getFieldDecorator('points')(
                    <InputNumber
                      min={0}
                      max={canUsePointsLimit || 0}
                      placeholder={transformLocale(LOCALE.REWARD_POINTS)}
                      onBlur={({ target }) =>
                        this.computeOrderList({
                          points: target.value === '' ? 0 : target.value,
                        })
                      }
                    />,
                  )}

                  <div
                    className={styles.points}
                    style={{
                      color: colors[2],
                      background: transformColor(colors[5]).alpha(0.15),
                    }}
                  >
                    {transformLocale(
                      LOCALE.REWARD_POINTS_CAN_USE(userPoints || 0),
                    )}

                    <font
                      style={{
                        color:
                          getFieldValue('points') > canUsePointsLimit || 0
                            ? 'red'
                            : 'inherit',
                      }}
                    >
                      {transformLocale(
                        LOCALE.POINTS_LIMIT(canUsePointsLimit || 0),
                      )}
                    </font>
                  </div>
                </FormItem>
              )}
            </div>

            <UserInfo form={form} />

            <ReceiverInfo
              form={form}
              countries={countries}
              chooseShipmentTemplate={(chooseShipment || {}).template}
              isSynchronizeUserInfo={isSynchronizeUserInfo}
              changeSynchronizeUserInfo={synchronizeUserInfo => {
                this.setState({ isSynchronizeUserInfo: synchronizeUserInfo });
              }}
              isSaveAsReceiverTemplate={isSaveAsReceiverTemplate}
              changeSaveAsReceiverTemplate={saveAsReceiverTemplate => {
                this.setState({
                  isSaveAsReceiverTemplate: saveAsReceiverTemplate,
                });
              }}
            />

            <CreditCardFormItem
              style={formItemStyle}
              rootStyle={styles.block}
              titleStyle={styles.title}
              form={form}
              choosePayment={choosePayment}
              changeCreditCardIsRegistered={isRegistered => {
                this.setState({ creditCardIsRegistered: isRegistered });
              }}
            />

            <div className={styles.formItem}>
              <div className={styles.buttonRoot}>
                <div
                  className={styles.continueShopping}
                  style={{ color: colors[3] }}
                  onClick={() => goTo({ back: true })}
                >
                  <ChevronLeftIcon className={styles.continueShoppingIcon} />
                  {transformLocale(LOCALE.CONTINUE_SHOPPING)}
                </div>

                <div className={styles.submitButtonRoot}>
                  {!paymentLater ? null : (
                    <Button
                      className={styles.paymentLaterButton}
                      style={{
                        color: colors[2],
                        backgroundColor: colors[1],
                        borderColor: colors[1],
                      }}
                      htmlType="submit"
                      loading={isChecking || isSubmitting}
                      disabled={
                        productHasError ||
                        (fieldsError =>
                          Object.keys(fieldsError).some(
                            field => fieldsError[field],
                          ))(getFieldsError())
                      }
                      onClick={() => {
                        this.isPayment = false;
                        validateFieldsAndScroll();
                      }}
                    >
                      {transformLocale`${LOCALE.CONFIRM}: ${LOCALE.PAY_LATER}`}
                    </Button>
                  )}

                  <Button
                    className={styles.submitButton}
                    style={{
                      color: colors[2],
                      backgroundColor: colors[4],
                      borderColor: colors[4],
                    }}
                    htmlType="submit"
                    loading={isChecking || isSubmitting}
                    disabled={
                      productHasError ||
                      (fieldsError =>
                        Object.keys(fieldsError).some(
                          field => fieldsError[field],
                        ))(getFieldsError())
                    }
                    onClick={() => {
                      this.isPayment = true;
                      validateFieldsAndScroll();
                    }}
                  >
                    {paymentLater
                      ? transformLocale`${LOCALE.CONFIRM}: ${LOCALE.PAY_NOW}`
                      : transformLocale(LOCALE.CONFIRM)}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>

        <ProductList
          activityInfo={activityInfo}
          priceInfo={priceInfo}
          showDetail={showDetail}
          products={products}
          productHasError={productHasError}
          updateProducts={newProducts => {
            this.computeOrderList({ products: newProducts });
            this.setState({ products: newProducts });
          }}
          closeDetail={() => this.setState({ showDetail: false })}
          isChoosenSipment={Boolean(chooseShipment)}
        />
      </StyleRoot>
    );
  }
}
