import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { Form, InputNumber, Button, Modal } from 'antd';
import uuid from 'uuid';
import { MdChevronLeft as ChevronLeftIcon } from 'react-icons/md';
import transformColor from 'color';

import { withTranslation } from '@store/utils/lib/i18n';
import GmoCreditCardForm from '@store/gmo-credit-card-form';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  COLOR_TYPE,
  COUNTRY_TYPE,
  STORE_SETTING_TYPE,
} from 'constants/propTypes';
import getComputeOrderQuery from 'utils/getComputeOrderQuery';

import PaymentDefaultFormItem from 'paymentDefaultFormItem';

import StepHeader from '../StepHeader';
import { PRESERVED_FIELDS, DEFERRED_FIELDS } from '../constants';

import UserInfo from './UserInfo';
import ReceiverInfo from './ReceiverInfo';
import ProductList from './ProductList';

import styles from './styles/index.less';
import { resetTimer } from './utils';
import { modifyAntdStyle, formItem as formItemStyle } from './styles';

const { Item: FormItem } = Form;

@Form.create({
  mapPropsToFields: ({ user, orderInfo, errors }) => {
    const { info, ...data } = orderInfo || {};
    const { name: userName, additionalInfo = {} } = user || {};
    const { mobile: userMobile } = additionalInfo;
    const fieldsData = {
      userName: data.userName || userName,
      userMobile: data.userMobile || userMobile,
      ...data,
      ...(info || {}),
    };

    return Object.keys(fieldsData).reduce(
      (fileds, key) => ({
        ...fileds,
        [key]: Form.createFormField({
          value: fieldsData[key],
          errors: errors[key],
        }),
      }),
      {},
    );
  },
  onFieldsChange: ({ onChange }, changedFields, allFields) => {
    onChange(
      Object.keys(allFields).reduce(
        (result, key) => ({
          orderInfo: {
            ...result.orderInfo,
            [key]: allFields[key].value,
          },
          errors: {
            ...result.errors,
            [key]: allFields[key].errors,
          },
        }),
        {
          orderInfo: {},
          errors: {},
        },
      ),
    );
  },
  onValuesChange: (_, changedValues, allValues) => {
    if (!global.window) return;

    PRESERVED_FIELDS.forEach(field => {
      if (allValues[field]) {
        window.sessionStorage.setItem(field, allValues[field]);
      }
    });

    resetTimer();
  },
})
@withTranslation('checkout')
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
    transformCurrency: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(COUNTRY_TYPE.isRequired),
    products: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    isSynchronizeUserInfo: PropTypes.bool,
    isSaveAsReceiverTemplate: PropTypes.bool,
    form: PropTypes.shape({}).isRequired,
    goToInCheckout: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    countries: null,
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
    this.restoreInfo();
  }

  componentDidUpdate() {
    this.checkCartIsEmpty();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  checkCartIsEmpty = () => {
    if (this.isUnmounted || this.isEmptyCart) return;

    const {
      /** context */
      goTo,

      /** props */
      t,
    } = this.props;
    const { products } = this.state;

    if (products.length === 0) {
      this.isEmptyCart = true;
      Modal.warning({
        title: t('cart-is-empty'),
        okText: t('confirm-go-to'),
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

    const [{ result, requestId: currentRequestId }] = this.cacheResult.slice(
      -1,
    );

    if (
      this.isUnmounted ||
      !result?.data?.computeOrderList ||
      currentRequestId !== requestId
    )
      return;

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
            isSynchronizeUserInfo,
            isSaveAsReceiverTemplate,
          });
        }
      },
    );
  };

  restoreInfo = () => {
    if (!global.window) return;

    const { form } = this.props;

    const preservedInfo = PRESERVED_FIELDS.reduce((values, field) => {
      let value = window.sessionStorage.getItem(field);

      if (!value && value !== 0) return values;

      if (field === 'address' || field === 'invoice') value = value.split(',');

      return {
        ...values,
        [field]: value,
      };
    }, {});

    if (Object.keys(preservedInfo).length !== 0)
      form.setFieldsValue(preservedInfo, () => {
        const deferredInfo = DEFERRED_FIELDS.reduce((values, field) => {
          const value = window.sessionStorage.getItem(field);

          if (!value && value !== 0) return values;

          return {
            ...values,
            [field]: value,
          };
        }, {});

        if (Object.keys(deferredInfo).length !== 0)
          form.setFieldsValue(deferredInfo, resetTimer);
      });
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
      t,
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
                {t('total-price')}：{transformCurrency(total)}
                <Button
                  onClick={() =>
                    this.setState({ showDetail: true }, () => {
                      document.querySelector('body').style.overflow = 'hidden';
                    })
                  }
                >
                  {t('check-detail')}
                </Button>
              </div>
            </div>

            <div className={styles.block}>
              <h3 className={styles.title}>{t('payment-info')}</h3>

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
                      placeholder={t('reward-points')}
                      onBlur={({ target }) =>
                        this.computeOrderList({
                          points:
                            target.value === ''
                              ? 0
                              : parseInt(target.value, 10),
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
                    {t('reward-points-can-use', { point: userPoints || 0 })}

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
                  </div>
                </FormItem>
              )}
            </div>

            <UserInfo form={form} />

            <ReceiverInfo
              form={form}
              countries={countries}
              choosePaymentTemplate={(choosePayment || {}).template}
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

            {!choosePayment ||
            choosePayment.template !== 'gmo' ||
            choosePayment.accountInfo.gmo.paymentType !== 'Credit' ? null : (
              <GmoCreditCardForm
                storePaymentId={choosePayment.paymentId}
                isInstallment={choosePayment.accountInfo.gmo.isInstallment}
                form={form}
              />
            )}

            <div className={styles.formItem}>
              <div className={styles.buttonRoot}>
                <div
                  className={styles.continueShopping}
                  style={{ color: colors[3] }}
                  onClick={() => goTo({ back: true })}
                >
                  <ChevronLeftIcon className={styles.continueShoppingIcon} />

                  {t('continue-shopping')}
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
                      {t('confirm')}: {t('pay-later')}
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
                      ? `${t('confirm')}: ${t('pay-now')}`
                      : t('confirm')}
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
