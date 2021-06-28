import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, InputNumber, Cascader, Modal } from 'antd';
import { getElementPosition } from 'fbjs';
import uuid from 'uuid';

import { withTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';
import PaymentDefaultFormItem from 'paymentDefaultFormItem';
import { ID_TYPE, LOCALE_TYPE, COLOR_TYPE } from 'constants/propTypes';
import getComputeOrderQuery from 'utils/getComputeOrderQuery';

import { ADDITION_TYPE } from '../constants';
import {
  block as blockStyle,
  title as titleStyle,
  formItem as formItemStyle,
} from '../styles';

import PriceInfo from './PriceInfo';
import { VARIANTS_TYPE, VARIANTS_TREE_TYPE } from './constants';
import getVariantOptions from './utils/getVariantOptions';
import mockPaymentInfoRef from './utils/mockPaymentInfoRef';

const { Item: FormItem } = Form;
const { Option } = Select;

@withTranslation('landing-page')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@enhancer
@mockPaymentInfoRef
class PayemntInfo extends React.PureComponent {
  isTracked = false;

  checkQuantityTimeout = null;

  cacheResult = [];

  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformCurrency: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    adTrack: PropTypes.shape({}).isRequired,
    moduleId: ID_TYPE.isRequired,
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
    const { i18n, id, variantsTree, isLogin } = nextProps;

    if ((id && id !== preState.productId) || isLogin !== preState.isLogin) {
      return {
        productId: id,
        isLogin,
        variantOptions: getVariantOptions(variantsTree.children, i18n),
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
    const { productId, isLogin } = this.state;

    if (preState.productId !== productId || preState.isLogin !== isLogin)
      this.fetchFirst();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    window.removeEventListener('scroll', this.scrollToLandingPage);
  }

  getVariantPrice = (variantIds, skipTrack = false) => {
    const { t, variants, addition } = this.props;
    const [variantId] = variantIds.slice(-1);
    const variant = variants.find(({ id }) => id === variantId) || {};
    let { minPurchaseItems, maxPurchaseLimit } = variant;

    // minPurchaseItems 最小需等於 1
    minPurchaseItems = minPurchaseItems > 0 ? minPurchaseItems : 1;

    // maxPurchaseLimit 最小需等於 minPurchaseItems
    if (typeof maxPurchaseLimit === 'number') {
      maxPurchaseLimit =
        maxPurchaseLimit > minPurchaseItems
          ? maxPurchaseLimit
          : minPurchaseItems;
    } else {
      maxPurchaseLimit = variant.stock;
    }

    const variantMin = minPurchaseItems;
    const variantMax =
      maxPurchaseLimit > variant.stock ? variant.stock : maxPurchaseLimit;

    if (variantMax === 0 || variantMax < variantMin)
      Modal.error({ title: t('no-variant') });

    if (!skipTrack && !addition.includes('quantity'))
      this.trackAddToCart({ variant: variantIds, quantity: 1 });

    this.computeOrderList({ variant: variantIds });
    this.setState({ variantMin, variantMax });
  };

  fetchFirst = () => {
    const {
      form: { getFieldValue, setFieldsValue },
      variants,
      addition,
    } = this.props;
    const { productId } = this.state;
    const variant = getFieldValue('variant');

    if (variants.length === 1) {
      const [{ id: variantId }] = variants;

      setFieldsValue([{ name: 'variant', value: [variantId] }]);
      this.getVariantPrice([variantId], true);
      this.scrollToLandingPage();

      if (!addition.includes('quantity'))
        window.addEventListener('scroll', this.scrollToLandingPage);
    } else if (variant) {
      this.getVariantPrice(variant);
    } else if (productId) {
      this.computeOrderList();
    }
  };

  scrollToLandingPage = () => {
    const {
      form: { getFieldsValue },
      moduleId,
    } = this.props;
    const { y } = getElementPosition(
      document.querySelector(`.landingPage-${moduleId}`),
    );

    if (y <= 0 && !this.isTracked) {
      this.trackAddToCart(getFieldsValue(true), () =>
        window.removeEventListener('scroll', this.scrollToLandingPage),
      );
    }
  };

  trackAddToCart = ({ variant: variantIds, quantity }, callback = () => {}) => {
    if (this.isTracked) return;

    const { adTrack, title, variants } = this.props;
    const { productId } = this.state;
    const variantId = variantIds.slice(-1)[0];
    const variant = variants.find(
      ({ id: currentVariantId }) => currentVariantId === variantId,
    );

    if (!variant) return;

    adTrack.addToCart({
      eventName: 'lp',
      id: productId,
      title,
      quantity,
      specs: variant.specs,
      price: variant.totalPrice,
    });
    this.isTracked = true;
    callback();
  };

  computeOrderList = async (fieldsValue = {}) => {
    const {
      form: { getFieldValue },
      getData,
      paymentFilter,
      shipmentFilter,
      updateComputeOrderList,
      addition,
    } = this.props;
    const { productId } = this.state;
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
    const {
      form: { getFieldValue },
    } = this.props;
    const { variantMin, variantMax } = this.state;

    clearTimeout(this.checkQuantityTimeout);
    this.trackAddToCart({ variant: getFieldValue('variant'), quantity });

    if (variantMin <= quantity && quantity <= variantMax) {
      this.checkQuantityTimeout = setTimeout(() => {
        this.computeOrderList({ quantity });
      }, 1000);
    }
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      t,
      i18n,
      title,
      variants,
      variantsTree,
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

    return (
      <div style={blockStyle}>
        <h3 style={titleStyle(colors)}>{t('select-product-payment')}</h3>

        <FormItem
          style={formItemStyle}
          name={['variant']}
          rules={[
            {
              type: 'array',
              required: true,
              message: t('select-product'),
            },
          ]}
        >
          {variants.length === 1 ? (
            <Select disabled>
              <Option value={variants[0].id}>
                {title[i18n.language] || title.zh_TW}
              </Option>
            </Select>
          ) : (
            <Cascader
              placeholder={
                title
                  ? title[i18n.language] || title.zh_TW
                  : t('select-product')
              }
              options={variantOptions}
              disabled={variantsTree.children.length === 0}
              displayRender={label =>
                label.length === 0
                  ? ''
                  : `${
                      title ? title[i18n.language] || title.zh_TW : ''
                    } ${label.join(' / ')}`
              }
              allowClear={false}
              onChange={variantIds => this.getVariantPrice(variantIds)}
            />
          )}
        </FormItem>

        {!addition.includes('quantity') ||
        variantMax === 0 ||
        variantMax < variantMin ? null : (
          <FormItem
            style={formItemStyle}
            name={['quantity']}
            rules={[
              {
                required: true,
                type: 'number',
                message: t('is-required'),
              },
            ]}
          >
            <InputNumber
              placeholder={`${t('quantity')} (${variantMin} ~ ${variantMax})`}
              min={variantMin}
              max={variantMax}
              onChange={this.checkQuantity}
            />
          </FormItem>
        )}

        <FormItem shouldUpdate noStyle>
          {form => (
            <PaymentDefaultFormItem
              style={formItemStyle}
              form={form}
              computeOrderList={this.computeOrderList}
              paymentList={paymentList}
              shipmentList={shipmentList}
              couponInfo={couponInfo}
            />
          )}
        </FormItem>

        {!productInfo ? null : <PriceInfo {...productInfo} />}
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default React.forwardRef((props, ref) => (
  <PayemntInfo {...props} paymentInfoRef={ref} />
));
