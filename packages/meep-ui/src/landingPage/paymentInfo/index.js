import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, InputNumber, Cascader, Modal } from 'antd';
import { getElementPosition } from 'fbjs';
import uuid from 'uuid';

import { enhancer } from 'layout/DecoratorsRoot';
import PaymentDefaultFormItem from 'paymentDefaultFormItem';
import {
  ID_TYPE,
  LOCALE_TYPE,
  COLOR_TYPE,
  STORE_SETTING_TYPE,
} from 'constants/propTypes';
import getComputeOrderQuery from 'utils/getComputeOrderQuery';
import removeContextTpyesFromProps from 'utils/removeContextTpyesFromProps';

import { ADDITION_TYPE } from '../constants';
import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from '../styles';

import PriceInfo from './PriceInfo';
import { VARIANTS_TYPE, VARIANTS_TREE_TYPE } from './constants';
import * as LOCALE from './locale';
import getVariantOptions from './utils/getVariantOptions';
import mockPaymentInfoRef from './utils/mockPaymentInfoRef';

const { Item: FormItem } = Form;
const { Option } = Select;

@enhancer
@mockPaymentInfoRef
class PayemntInfo extends React.PureComponent {
  isTracked = false;

  checkQuantityTimeout = null;

  trackTimeout = null;

  cacheResult = [];

  static propTypes = {
    /** context */
    storeSetting: STORE_SETTING_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    adTrack: PropTypes.func.isRequired,

    /** props */
    moduleId: ID_TYPE.isRequired,
    form: PropTypes.shape({}).isRequired,
    changeChoosePayment: PropTypes.func.isRequired,
    changeChooseShipmentTemplate: PropTypes.func.isRequired,
    updateComputeOrderList: PropTypes.func.isRequired,

    /** moduleProps.productData */
    id: ID_TYPE,
    title: LOCALE_TYPE,
    variants: VARIANTS_TYPE,
    variantsTree: VARIANTS_TREE_TYPE,

    /** moduleProps */
    addition: ADDITION_TYPE.isRequired,
    paymentFilter: PropTypes.arrayOf(ID_TYPE.isRequired).isRequired,
    shipmentFilter: PropTypes.arrayOf(ID_TYPE.isRequired).isRequired,
  };

  static defaultProps = {
    id: null,
    title: null,
    variants: [],
    variantsTree: { children: [] },
  };

  state = {
    productId: null,
    variantOptions: [],
    variantMax: 0,
    variantMin: 0,
    shipmentList: [],
    paymentList: [],
    productInfo: null,
    couponInfo: null,
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { transformLocale, id, variantsTree } = nextProps;

    if (id && id !== preState.productId) {
      return {
        productId: id,
        variantOptions: getVariantOptions(variantsTree.children, {
          transformLocale,
        }),
        variantMax: 0,
        variantMin: 0,
      };
    }

    return null;
  }

  componentDidMount() {
    this.fetchFirst();
  }

  componentDidUpdate(preProps, preState) {
    const { productId } = this.state;

    if (preState.productId !== productId) this.fetchFirst();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    window.removeEventListener('scroll', this.scrollToLandingPage);
  }

  getVariantInfo = variant => {
    const {
      /** context */
      transformLocale,

      /** props */
      variants,
    } = this.props;
    const [variantId] = variant.slice(-1);
    const { stock, minPurchaseItems: variantMin, maxPurchaseLimit } =
      variants.find(({ id }) => id === variantId) || {};
    const variantMax = maxPurchaseLimit > stock ? stock : maxPurchaseLimit;

    if (variantMax === 0 || variantMax < variantMin)
      Modal.error({ title: transformLocale(LOCALE.NO_VARIANT) });

    this.trackAddToCart();
    this.computeOrderList({ variant });
    this.setState({ variantMin, variantMax });
  };

  fetchFirst = () => {
    const { form, variants } = this.props;
    const { productId } = this.state;

    const { getFieldValue, setFieldsValue } = form;
    const variant = getFieldValue('variant');

    if (variants.length === 1) {
      const [{ id: variantId }] = variants;

      setFieldsValue({ variant: [variantId] });
      this.getVariantInfo([variantId]);
      this.scrollToLandingPage();
      window.addEventListener('scroll', this.scrollToLandingPage);
    } else if (variant) {
      this.getVariantInfo(variant);
    } else if (productId) {
      this.computeOrderList();
    }
  };

  scrollToLandingPage = () => {
    const { moduleId } = this.props;
    const { y } = getElementPosition(
      document.querySelector(`.landingPage-${moduleId}`),
    );

    if (y <= 0 && this.isTracked) {
      this.trackAddToCart(() =>
        window.removeEventListener('scroll', this.scrollToLandingPage),
      );
    }
  };

  trackAddToCart = (callback = () => {}) => {
    if (this.isTracked) return;

    clearTimeout(this.trackTimeout);
    this.trackTimeout = setTimeout(() => {
      const { adTrack, form, title, variants, ...props } = this.props;
      const [variantId] = form.getFieldValue('variant').slice(-1);

      adTrack('AddToCart-LP', {
        ...removeContextTpyesFromProps(props),
        ...form.getFieldsValue(),
        variant: variants.find(({ id }) => id === variantId) || {},
        title,
      });
      this.isTracked = true;
      callback();
    }, 5000);
  };

  computeOrderList = async (fieldsValue = {}) => {
    const {
      getData,
      form,
      paymentFilter,
      shipmentFilter,
      updateComputeOrderList,
      addition,
    } = this.props;
    const { productId } = this.state;
    const { getFieldValue } = form;
    const [variant = [], quantity, paymentId, shipmentId, coupon] = [
      'variant',
      'quantity',
      'paymentId',
      'shipmentId',
      'coupon',
    ].map(key => fieldsValue[key] || getFieldValue(key));
    const [variantId] = variant.slice(-1);
    const requestId = uuid();

    this.cacheResult.push({
      requestId,
    });
    this.cacheResult.find(
      ({ requestId: cacheId }) => cacheId === requestId,
    ).result = await getData(
      ...getComputeOrderQuery({
        coupon,
        paymentId,
        shipmentId,
        products: [
          {
            productId,
            variantId,
            quantity: addition.includes('quantity') ? quantity : 1,
          },
        ],
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

    const { changeChoosePayment, changeChooseShipmentTemplate } = this.props;
    const { computeOrderList } = result.data;
    const [
      { categories, activityInfo, priceInfo, errorObj },
    ] = computeOrderList;
    const [{ paymentList, shipmentList }] = categories || [
      { paymentTemplates: [], shipmentTemplates: [] },
    ];
    const { template } =
      shipmentList.find(({ shipmentId: id }) => id === shipmentId) || {};

    changeChoosePayment(
      paymentList.find(({ paymentId: id }) => id === paymentId) || null,
    );
    changeChooseShipmentTemplate(template);
    updateComputeOrderList(computeOrderList[0]);

    this.setState({
      paymentList: paymentList.filter(({ paymentId: id }) =>
        paymentFilter.includes(id),
      ),
      shipmentList: shipmentList.filter(({ shipmentId: id }) =>
        shipmentFilter.includes(id),
      ),
      couponInfo: { checkId: uuid.v4(), activityInfo, errorObj },
      productInfo: { activityInfo, priceInfo },
    });
  };

  checkQuantity = quantity => {
    const { variantMin, variantMax } = this.state;

    clearTimeout(this.checkQuantityTimeout);
    this.trackAddToCart();

    if (variantMin <= quantity && quantity <= variantMax) {
      this.checkQuantityTimeout = setTimeout(() => {
        this.computeOrderList({ quantity });
      }, 1000);
    }
  };

  render() {
    const {
      colors,
      transformLocale,
      title,
      variants,
      variantsTree,
      form,
      addition,
    } = this.props;
    const {
      variantOptions,
      variantMax,
      variantMin,
      shipmentList,
      paymentList,
      couponInfo,
      productInfo,
    } = this.state;

    const { getFieldDecorator } = form;

    return (
      <div style={blockStyle}>
        <h3 style={titleStyle(colors)}>
          {transformLocale(LOCALE.SELECT_PRODUCT_PAYMENT)}
        </h3>

        <FormItem style={formItemStyle}>
          {getFieldDecorator('variant', {
            rules: [
              {
                type: 'array',
                required: true,
                message: transformLocale(LOCALE.SELECT_PRODUCT),
              },
            ],
          })(
            variants.length === 1 ? (
              <Select disabled>
                <Option value={variants[0].id}>{transformLocale(title)}</Option>
              </Select>
            ) : (
              <Cascader
                placeholder={transformLocale(title || LOCALE.SELECT_PRODUCT)}
                options={variantOptions}
                disabled={variantsTree.children.length === 0}
                displayRender={label =>
                  label.length === 0
                    ? ''
                    : `${title ? transformLocale(title) : ''} ${label.join(
                        ' / ',
                      )}`
                }
                allowClear={false}
                onChange={this.getVariantInfo}
              />
            ),
          )}
        </FormItem>

        {!addition.includes('quantity') ||
        variantMax === 0 ||
        variantMax < variantMin ? null : (
          <FormItem style={formItemStyle}>
            {getFieldDecorator('quantity', {
              rules: [
                {
                  required: true,
                  type: 'number',
                  message: transformLocale(LOCALE.IS_REQUIRED),
                },
              ],
            })(
              <InputNumber
                placeholder={`${transformLocale(
                  LOCALE.QUANTITY,
                )} (${variantMin} ~ ${variantMax})`}
                min={variantMin}
                max={variantMax}
                onChange={this.checkQuantity}
              />,
            )}
          </FormItem>
        )}

        <PaymentDefaultFormItem
          style={formItemStyle}
          form={form}
          computeOrderList={this.computeOrderList}
          paymentList={paymentList}
          shipmentList={shipmentList}
          couponInfo={couponInfo}
        />

        {!productInfo ? null : <PriceInfo {...productInfo} />}
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default React.forwardRef((props, ref) => (
  <PayemntInfo {...props} paymentInfoRef={ref} />
));
