import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { LeftOutlined } from '@ant-design/icons';
import { Form, InputNumber, Button, Modal } from 'antd';
import uuid from 'uuid';
import transformColor from 'color';
import { useMutation } from '@apollo/react-hooks';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import { withTranslation } from '@meepshop/locales';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';
import GmoCreditCardForm from '@meepshop/gmo-credit-card-form';
import { ErrorMultiIcon } from '@meepshop/icons';
import { log } from '@meepshop/logger/lib/gqls/log';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, STORE_SETTING_TYPE } from 'constants/propTypes';
import { computeOrderList, getVariables } from 'utils/getComputeOrderQuery';

import PaymentDefaultFormItem from 'paymentDefaultFormItem';

import StepHeader from '../StepHeader';
import { PRESERVED_FIELDS, DEFERRED_FIELDS } from '../constants';

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
      userAddressAndZipCode: data.userAddressAndZipCode ?? {
        address: [
          address?.country?.id,
          address?.city?.id,
          address?.area?.id,
        ].filter(Boolean),
        zipCode: address?.zipCode,
      },
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
    goTo: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,

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
    showDetail: false,
    computeOrderData: {
      paymentList: [],
      shipmentList: [],
    },
    // eslint-disable-next-line react/destructuring-assignment
    products: this.props.carts?.categories.products || [],
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
    const { logMutation } = this.props;

    this.computeOrderList();
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

    if (prevProps.carts?.id !== carts?.id) {
      this.computeOrderList({ products: carts?.categories.products || [] });
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

    const {
      /** context */
      goTo,

      /** props */
      t,
      adTrack,
      isSubmitting,
    } = this.props;
    const { products, computeOrderData, isChecking } = this.state;

    if (isSubmitting || isChecking) return;

    if (products.length === 0) {
      this.isEmptyCart = true;
      Modal.warning({
        title: t('cart-is-empty'),
        okText: t('confirm-go-to'),
        onOk: () => goTo({ pathname: '/' }),
      });
    } else if (!this.isTracked && computeOrderData.total) {
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

    if (isSubmitting) return;

    const { products } = this.state;
    const [paymentId, shipmentId, coupon, points] = [
      'paymentId',
      'shipmentId',
      'coupon',
      'points',
    ].map(key =>
      fieldsValue[key] !== undefined ? fieldsValue[key] : getFieldValue(key),
    );

    this.setState({ isChecking: true });

    const { data } = await mutation(
      getVariables({
        coupon,
        points,
        paymentId,
        shipmentId,
        products: (fieldsValue.products || products).filter(
          ({ type }) => type === 'product',
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
      products: newProducts.map(product => {
        const { error, type, currentMinPurchasableQty } = product;

        if (error && /已下架/.test(error))
          return {
            ...product,
            error: 'PRODUCT_NOT_ONLINE',
          };

        if (type !== 'product' && (currentMinPurchasableQty === 0 || error))
          return {
            ...product,
            error: 'GIFT_OUT_OF_STOCK',
          };

        if (currentMinPurchasableQty === 0)
          return {
            ...product,
            error: 'PRODUCT_SOLD_OUT',
          };

        return {
          ...product,
          error: null,
        };
      }),
      choosePayment: paymentList.find(({ paymentId: id }) => id === paymentId),
      chooseShipment: shipmentList.find(
        ({ shipmentId: id }) => id === shipmentId,
      ),
      isChecking: false,
    });
  };

  finish = data => {
    const { isChecking } = this.state;

    if (isChecking) return;

    const { submit } = this.props;
    const {
      computeOrderData,
      products,
      choosePayment,
      isSynchronizeUserInfo,
      isSaveAsReceiverTemplate,
    } = this.state;
    const checkProductError = products.some(product => {
      const {
        error,
        quantity,
        type,
        variant: { currentMinPurchasableQty, currentMaxPurchasableQty },
      } = product;

      return (
        type === 'product' &&
        (error ||
          quantity < currentMinPurchasableQty ||
          quantity > currentMaxPurchasableQty)
      );
    });

    if (checkProductError) {
      this.setState({ productHasError: true }, () => {
        const dom = document.querySelector(`.${styles.cartButton}`);

        if (dom) dom.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      return;
    }

    const {
      priceInfo,
      activityInfo,
      paymentList,
      shipmentList,
    } = computeOrderData;

    submit(this.isPayment, data, {
      priceInfo,
      activityInfo,
      paymentList,
      shipmentList,
      products,
      choosePayment,
      isSynchronizeUserInfo,
      isSaveAsReceiverTemplate,
    });
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

  render() {
    const {
      /** context */
      colors,
      storeSetting,
      transformCurrency,
      hasStoreAppPlugin,
      goTo,

      /** props */
      form,
      fields,
      t,
      user,
      isSubmitting,
      shippableRecipientAddresses,
      checkoutFields,
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

        <Form
          className={styles.fields}
          form={form}
          fields={fields}
          onFieldsChange={this.fieldsChange}
          onFinish={this.finish}
          scrollToFirstError
        >
          <div className={styles.wrapper}>
            <StepHeader />

            <div className={styles.phoneSizeInfo}>
              {storeName}

              <div className={styles.phoneSizeWrapper}>
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
                    couponInfo={couponInfo}
                  />
                )}
              </FormItem>

              {!(hasStoreAppPlugin('points') && userPoints > 0) ? null : (
                <>
                  <FormItem className={styles.formItem} name={['points']}>
                    <InputNumber
                      min={0}
                      max={canUsePointsLimit || 0}
                      placeholder={t('reward-points')}
                      onBlur={({ target }) =>
                        this.computeOrderList({
                          points:
                            target.value === ''
                              ? 0
                              : parseInt(target.value, 10),
                        })
                      }
                    />
                  </FormItem>

                  <div
                    className={styles.points}
                    style={{
                      color: colors[2],
                      background: transformColor(colors[5]).alpha(0.15),
                    }}
                  >
                    {t('reward-points-can-use', { point: userPoints || 0 })}

                    <FormItem dependencies={['points']} noStyle>
                      {({ getFieldValue }) => (
                        <font
                          style={{
                            color:
                              getFieldValue('points') > canUsePointsLimit || 0
                                ? 'red'
                                : 'inherit',
                          }}
                        >
                          {t('points-limit', { point: canUsePointsLimit || 0 })}
                        </font>
                      )}
                    </FormItem>
                  </div>
                </>
              )}
            </div>

            <UserInfo user={user} checkoutFields={checkoutFields} />

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
              />
            )}

            <div className={styles.formItem}>
              <div className={styles.buttonRoot}>
                <div
                  className={styles.continueShopping}
                  style={{ color: colors[3] }}
                  onClick={() => goTo({ back: true })}
                >
                  <LeftOutlined className={styles.continueShoppingIcon} />

                  {t('continue-shopping')}
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
          products={products}
          productHasError={productHasError}
          updateProducts={newProducts => {
            this.computeOrderList({ products: newProducts });
          }}
          closeDetail={() =>
            this.setState({ showDetail: false }, () => {
              document.querySelector('body').style = '';
            })
          }
          isChoosenSipment={Boolean(chooseShipment)}
        />
      </StyleRoot>
    );
  }
}
