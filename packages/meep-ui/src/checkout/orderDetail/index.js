import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { LeftOutlined } from '@ant-design/icons';
import { Spin, Form, Button, Modal, notification } from 'antd';
import uuid from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import { areEqual } from 'fbjs';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import { withTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';
import GmoCreditCardForm from '@meepshop/gmo-credit-card-form';
import { ErrorMultiIcon } from '@meepshop/icons';
import { log } from '@meepshop/logger/lib/gqls/log';
import CheckoutSteps from '@store/checkout-steps';
import Discount from '@store/checkout/lib/Discount';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, STORE_SETTING_TYPE } from 'constants/propTypes';
import { computeOrderList, getVariables } from 'utils/getComputeOrderQuery';

import PaymentDefaultFormItem from 'paymentDefaultFormItem';

import { computedCartInCheckout } from '@store/checkout/lib/gqls/useCheckout';
import { PRESERVED_FIELDS, DEFERRED_FIELDS } from '../constants';

import DiscountMonitor from './DiscountMonitor';
import UserInfo from './UserInfo';
import ReceiverInfo from './ReceiverInfo';
import ProductList from './ProductList';

// Use to copy mixin.less
import './styles/mixin.less';
import styles from './styles/index.less';
import { resetTimer } from './utils';
import { modifyAntdStyle, formItem as formItemStyle } from './styles';

const { Item: FormItem } = Form;

@withTranslation('checkout')
@withContext(AdTrackContext)
@withHook(({ user, orderInfo, errors }) => ({
  router: useRouter(),
  mutation: useMutation(computeOrderList)[0],
  logMutation: useMutation(log)[0],
  form: Form.useForm()[0],
  fields: useMemo(() => {
    const { info, ...data } = orderInfo || {};
    const { name: userName, mobile: userMobile, address } = user || {};
    const fieldsData = {
      ...data,
      ...info,
      userName: data.userName ?? userName,
      userMobile: data.userMobile ?? userMobile,
      userAddressAndZipCode:
        data.userAddressAndZipCode ??
        (!address
          ? undefined
          : {
              address: [
                address.country?.id,
                address.city?.id,
                address.area?.id,
              ].filter(Boolean),
              zipCode: address.zipCode,
            }),
      userStreet: data.userStreet ?? address?.street,
    };

    return Object.keys(fieldsData).reduce(
      (result, key) => [
        ...result,
        {
          name: [key],
          value: fieldsData[key],
          errors: errors[key],
        },
      ],
      [],
    );
  }, [user, orderInfo, errors]),
}))
@enhancer
@withHook(({ carts, cartLoading }) => {
  const { data, refetch } = useQuery(computedCartInCheckout, {
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        cartItems: carts.map(({ __typename: _, ...cartItem }) => cartItem),
      },
    },
    skip: cartLoading,
  });

  return {
    cartLoading: cartLoading || !data?.computedCart,
    carts:
      data?.computedCart?.computedLineItems.filter(
        ({ type }) => type !== 'GIFT',
      ) || [],
    upsellingLimitPerOrder:
      data?.viewer?.store?.activeUpsellingArea?.limitPerOrder || 0,
    refetch,
  };
})
@radium
export default class OrderDetail extends React.PureComponent {
  isEmptyCart = false;

  isPayment = true;

  isTracked = false;

  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,
    transformCurrency: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    isSynchronizeUserInfo: PropTypes.bool,
    isSaveAsReceiverTemplate: PropTypes.bool,
    isSubmitting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    isSynchronizeUserInfo: false,
    isSaveAsReceiverTemplate: false,
  };

  state = {
    loading: true,
    showDetail: false,
    computeOrderData: {
      paymentList: [],
      shipmentList: [],
    },
    // eslint-disable-next-line react/destructuring-assignment
    products: [],
    choosePayment: null,
    chooseShipment: null,
    productHasError: false,
    // eslint-disable-next-line react/destructuring-assignment
    isSynchronizeUserInfo: this.props.isSynchronizeUserInfo,
    // eslint-disable-next-line react/destructuring-assignment
    isSaveAsReceiverTemplate: this.props.isSaveAsReceiverTemplate,
    isChecking: false,
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const {
      form: { getFieldsValue },
    } = nextProps;
    const { paymentId, shipmentId } = getFieldsValue([
      'paymentId',
      'shipmentId',
    ]);

    if (
      paymentId !== (preState.choosePayment || {}).paymentId ||
      shipmentId !== (preState.chooseShipment || {}).shipmentId
    )
      return {
        choosePayment: preState.computeOrderData.paymentList.find(
          ({ paymentId: id }) => id === paymentId,
        ),
        chooseShipment: preState.computeOrderData.shipmentList.find(
          ({ shipmentId: id }) => id === shipmentId,
        ),
      };

    return null;
  }

  componentDidMount() {
    const { logMutation, carts } = this.props;

    this.computeOrderList({ products: carts });
    try {
      this.restoreInfo();
    } catch ({ message, stack }) {
      logMutation({
        variables: {
          input: {
            type: 'ERROR',
            name: 'CHECKOUT_RESTORE_INFO',
            data: {
              message,
              stack,
            },
          },
        },
      });
    }
  }

  componentDidUpdate(prevProps) {
    this.checkCartIsEmpty();

    const { carts } = this.props;

    if (!areEqual(prevProps.carts, carts)) {
      this.computeOrderList({ products: carts || [] });
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  fieldsChange = (changedFields, allFields) => {
    const { onChange } = this.props;

    onChange(
      allFields.reduce(
        (result, { name: [key], value, errors }) => {
          if (value && PRESERVED_FIELDS.includes(key)) {
            window.sessionStorage.setItem(
              key,
              key === 'addressAndZipCode' ? JSON.stringify(value) : value,
            );
            resetTimer();
          }

          return {
            orderInfo: {
              ...result.orderInfo,
              [key]: value,
              ...(changedFields?.[0]?.name?.[0] !== 'shipmentId'
                ? {}
                : {
                    CVSAddress: null,
                    CVSStoreID: null,
                    CVSStoreName: null,
                    cvsCode: null,
                    cvsType: null,
                  }),
            },
            errors: {
              ...result.errors,
              [key]: errors,
            },
          };
        },
        {
          orderInfo: {},
          errors: {},
        },
      ),
    );
  };

  checkCartIsEmpty = () => {
    if (this.isUnmounted || this.isEmptyCart) return;

    const { router, t, adTrack, isSubmitting, cartLoading, carts } = this.props;
    const { products, computeOrderData, isChecking } = this.state;

    if (isSubmitting || isChecking || cartLoading) return;

    if (carts.length === 0) {
      this.isEmptyCart = true;
      Modal.warning({
        title: t('cart-is-empty'),
        okText: t('confirm-go-to'),
        onOk: () => router.push('/'),
      });
      return;
    }

    if (!carts.some(item => item.type === 'PRODUCT')) {
      this.isEmptyCart = true;
      Modal.warning({
        title: t('only-upselling'),
        okText: t('confirm-go-to'),
        onOk: () => router.push('/'),
      });
      return;
    }

    if (!this.isTracked && computeOrderData.total) {
      this.isTracked = true;
      adTrack.beginCheckout({
        products: products.map(({ productId, ...product }) => ({
          ...product,
          id: productId,
        })),
        total: computeOrderData.total,
      });
    }
  };

  computeOrderList = async (fieldsValue = {}) => {
    const {
      form: { getFieldValue },
      mutation,
      isSubmitting,
    } = this.props;
    const { products, isChecking } = this.state;

    if (isSubmitting || isChecking) return;

    this.setState({ isChecking: true });

    const [paymentId, shipmentId, coupon, points] = [
      'paymentId',
      'shipmentId',
      'coupon',
      'points',
    ].map(key =>
      fieldsValue[key] !== undefined ? fieldsValue[key] : getFieldValue(key),
    );

    const { data } = await mutation(
      getVariables({
        coupon,
        points,
        paymentId,
        shipmentId,
        products: (fieldsValue.products || products).filter(
          ({ type }) => type !== 'gift',
        ),
      }),
    );

    if (this.isUnmounted || !data?.computeOrderList) return;

    const [
      { activityInfo, priceInfo, categories, errorObj },
    ] = data.computeOrderList;
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
      loading: false,
      productHasError: false,
    });
  };

  finish = async data => {
    const { isChecking } = this.state;

    if (isChecking) return;

    const { submit, t, refetch } = this.props;
    const {
      computeOrderData,
      products,
      choosePayment,
      isSynchronizeUserInfo,
      isSaveAsReceiverTemplate,
    } = this.state;
    const checkProductError = products.some(
      product => product?.type !== 'gift' && product?.error,
    );

    if (checkProductError) {
      this.scrollToError();
      return;
    }

    const {
      priceInfo,
      activityInfo,
      paymentList,
      shipmentList,
    } = computeOrderData;

    const errorMessage = await submit(this.isPayment, data, {
      priceInfo,
      activityInfo,
      paymentList,
      shipmentList,
      products,
      choosePayment,
      isSynchronizeUserInfo,
      isSaveAsReceiverTemplate,
    });

    if (errorMessage) {
      if (
        [
          'DISCONTINUED',
          'NOT_AVAILABLE',
          'OUT_OF_STOCK',
          'LIMIT_EXCEEDED',
          'MINIMUM_NOT_REACHED',
          'EXCEED_LIMIT_PER_ORDER',
        ].includes(errorMessage)
      ) {
        notification.error({ message: t('pay-fail') });
        await refetch();
        await this.computeOrderList();
        this.scrollToError();
        return;
      }

      notification.error({
        message: t('pay-fail'),
        description: /(<st_code>|七天後關|門市不存在|門市關轉店或為外島|取貨門市店代碼)/.test(
          errorMessage,
        )
          ? '原取件門市暫停服務，請重新選擇！'
          : errorMessage,
      });
    }
  };

  restoreInfo = () => {
    if (!global.window) return;

    const {
      form: { setFields },
    } = this.props;
    const preservedInfo = PRESERVED_FIELDS.reduce((values, field) => {
      let value = window.sessionStorage.getItem(field);

      if (!value && value !== 0) return values;

      if (field === 'addressAndZipCode') value = JSON.parse(value);

      if (field === 'invoice') value = value.split(',');

      return [
        ...values,
        {
          name: [field],
          value,
          errors: [],
        },
      ];
    }, []);

    if (preservedInfo.length !== 0) {
      setFields(preservedInfo);
      const deferredInfo = DEFERRED_FIELDS.reduce((values, field) => {
        const value = window.sessionStorage.getItem(field);

        if (!value && value !== 0) return values;

        return [
          ...values,
          {
            name: [field],
            value,
            errors: [],
          },
        ];
      }, []);

      if (deferredInfo.length !== 0) {
        setFields(deferredInfo);
      }

      resetTimer();
    }
  };

  scrollToError = () => {
    this.setState({ productHasError: true }, () => {
      const dom = document.querySelector(`.${styles.cartButton}`);

      if (dom) dom.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  render() {
    const {
      /** context */
      colors,
      storeSetting,
      transformCurrency,

      /** props */
      form,
      fields,
      router,
      t,
      user,
      isSubmitting,
      shippableRecipientAddresses,
      lineLoginSetting,
      checkoutFields,
      cartLoading,
      carts,
      upsellingLimitPerOrder,
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
      loading,
    } = this.state;

    const { storeName } = storeSetting;
    const {
      total,
      paymentList,
      shipmentList,
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

        <Form
          className={styles.fields}
          form={form}
          fields={fields}
          onFieldsChange={this.fieldsChange}
          onFinish={this.finish}
          scrollToFirstError
        >
          <div className={styles.wrapper}>
            <CheckoutSteps step="checkout" />

            <div className={styles.phoneSizeInfo}>
              {storeName}

              <div className={styles.phoneSizeWrapper}>
                {cartLoading ? (
                  <Spin />
                ) : (
                  <>
                    <div>
                      {t('total-price')}：{transformCurrency(total)}
                      <div className={styles.cartButton}>
                        <Button
                          onClick={() =>
                            this.setState({ showDetail: true }, () => {
                              document.querySelector('body').style.overflow =
                                'hidden';
                            })
                          }
                        >
                          {t('cart')}
                        </Button>

                        {!productHasError ? null : <ErrorMultiIcon />}
                      </div>
                    </div>

                    {!productHasError ? null : (
                      <div className={styles.cartError}>
                        {t('cart-has-error.0')}

                        <span>{t('cart')}</span>

                        {t('cart-has-error.1')}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className={styles.block}>
              <h3 className={styles.title}>{t('payment-info')}</h3>

              <FormItem shouldUpdate noStyle>
                {subForm => (
                  <PaymentDefaultFormItem
                    style={formItemStyle}
                    form={subForm}
                    computeOrderList={this.computeOrderList}
                    paymentList={paymentList}
                    shipmentList={shipmentList}
                  />
                )}
              </FormItem>
            </div>

            <FormItem dependencies={['coupon', 'points']} noStyle>
              {({ getFieldValue }) => (
                <DiscountMonitor
                  coupon={getFieldValue(['coupon'])}
                  points={getFieldValue(['points'])}
                  computeOrderList={this.computeOrderList}
                />
              )}
            </FormItem>

            <Discount
              computeOrderList={{
                activityInfo,
                priceInfo: {
                  userPoints,
                  canUsePointsLimit,
                },
                errorObj: computeOrderData?.couponInfo?.errorObj,
              }}
            />

            <UserInfo
              user={user}
              checkoutFields={checkoutFields}
              lineLoginSetting={lineLoginSetting}
              choosePaymentTemplate={(choosePayment || {}).template}
            />

            <FormItem shouldUpdate noStyle>
              {subForm => (
                <ReceiverInfo
                  form={subForm}
                  checkoutFields={checkoutFields}
                  shippableRecipientAddresses={shippableRecipientAddresses}
                  choosePaymentTemplate={(choosePayment || {}).template}
                  chooseShipmentTemplate={(chooseShipment || {}).template}
                  isSynchronizeUserInfo={isSynchronizeUserInfo}
                  changeSynchronizeUserInfo={synchronizeUserInfo => {
                    this.setState({
                      isSynchronizeUserInfo: synchronizeUserInfo,
                    });
                  }}
                  isSaveAsReceiverTemplate={isSaveAsReceiverTemplate}
                  changeSaveAsReceiverTemplate={saveAsReceiverTemplate => {
                    this.setState({
                      isSaveAsReceiverTemplate: saveAsReceiverTemplate,
                    });
                  }}
                />
              )}
            </FormItem>

            {!choosePayment ||
            choosePayment.template !== 'gmo' ||
            choosePayment.accountInfo.gmo.paymentType !== 'Credit' ? null : (
              <GmoCreditCardForm
                storePaymentId={choosePayment.paymentId}
                isInstallment={choosePayment.accountInfo.gmo.isInstallment}
                rememberCardNumber={
                  choosePayment.accountInfo.gmo.rememberCardNumber
                }
              />
            )}

            <div className={styles.formItem}>
              <div className={styles.buttonRoot}>
                <div
                  className={styles.continueShopping}
                  style={{ color: colors[3] }}
                  onClick={() => router.push('/cart')}
                >
                  <LeftOutlined className={styles.continueShoppingIcon} />

                  {t('go-back-to-cart')}
                </div>

                <div className={styles.submitButtonRoot}>
                  {!paymentLater ? null : (
                    <FormItem shouldUpdate noStyle>
                      {({ getFieldsError }) => (
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
                            getFieldsError().some(
                              ({ errors }) => errors.length !== 0,
                            )
                          }
                          onClick={() => {
                            this.isPayment = false;
                          }}
                        >
                          {t('confirm')}: {t('pay-later')}
                        </Button>
                      )}
                    </FormItem>
                  )}

                  <FormItem shouldUpdate noStyle>
                    {({ getFieldsError }) => (
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
                          getFieldsError().some(
                            ({ errors }) => errors.length !== 0,
                          )
                        }
                        onClick={() => {
                          this.isPayment = true;
                        }}
                      >
                        {paymentLater
                          ? `${t('confirm')}: ${t('pay-now')}`
                          : t('confirm')}
                      </Button>
                    )}
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
        </Form>

        <ProductList
          activityInfo={activityInfo}
          priceInfo={priceInfo}
          showDetail={showDetail}
          products={loading ? [] : products}
          productHasError={productHasError}
          loading={cartLoading || (carts.length !== 0 && products.length === 0)}
          closeDetail={() =>
            this.setState({ showDetail: false }, () => {
              document.querySelector('body').style = '';
            })
          }
          isChoosenSipment={Boolean(chooseShipment)}
          upsellingLimitPerOrder={upsellingLimitPerOrder}
        />
      </StyleRoot>
    );
  }
}
