import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import { Form, Button, Divider, notification } from 'antd';
import moment from 'moment';

import { enhancer } from 'layout/DecoratorsRoot';
import CreditCardFormItem from 'creditCardFormItem';
import {
  ID_TYPE,
  URL_TYPE,
  USER_TYPE,
  LOCATION_TYPE,
  COLOR_TYPE,
  ISLOGIN_TYPE,
  CONTENT_WIDTH_TYPE,
} from 'constants/propTypes';
import loadData from 'utils/loadData';
import buildVariantsTree from 'utils/buildVariantsTree';
import getCreateOrderQuery from 'utils/getCreateOrderQuery';
import createFormData from 'utils/createFormData';
import findDOMTop from 'utils/findDOMTop';
import fetchStreamName from 'utils/fetchStreamName';
import { TAIWAN } from 'locale/country';

import PaymentInfo from './paymentInfo';
import ReceiverInfo from './ReceiverInfo';
import { ADDITION_TYPE } from './constants';
import * as LOCALE from './locale';
import mockOrderInfo from './utils/mockOrderInfo';
import * as styles from './styles';

@enhancer
@loadData(['productData'])
@buildVariantsTree('productData')
@mockOrderInfo
@Form.create({
  mapPropsToFields: ({ orderInfo }) => {
    const { info, ...data } = orderInfo || {};
    const fieldsData = { ...(info || {}), ...data };

    return Object.keys(fieldsData).reduce(
      (fileds, key) => ({
        ...fileds,
        [key]: Form.createFormField({
          value: key === 'birthday' ? moment(fieldsData[key]) : fieldsData[key],
        }),
      }),
      {},
    );
  },
  onValuesChange: ({ updateOrderInfo }, changedValues, allValues) =>
    updateOrderInfo(allValues),
})
@radium
export default class LandingPage extends React.PureComponent {
  paymentInfoRef = React.createRef();

  formRef = React.createRef();

  /** just for adTrack, not use in state */
  storeComputeOrderList = null;

  // eslint-disable-next-line react/destructuring-assignment
  needToTrackViewProduct = this.props.location.hash !== 'choose-shipment-store';

  static propTypes = {
    /** context */
    user: USER_TYPE,
    cname: PropTypes.string,
    location: LOCATION_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    adTrack: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,

    /** ant.Form */
    form: PropTypes.shape({
      getFieldValue: PropTypes.func.isRequired,
      getFieldsError: PropTypes.func.isRequired,
    }).isRequired,

    /** @buildVariantsTree moduleProps.productData */
    productData: PropTypes.shape({
      id: ID_TYPE.isRequired,
    }),

    /** @mockOrderInfo */
    updateOrderInfo: PropTypes.func.isRequired,

    /** moduleProps */
    id: ID_TYPE.isRequired,
    redirectPage: URL_TYPE.isRequired,
    addition: ADDITION_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
    agreedMatters: PropTypes.string.isRequired,
  };

  static defaultProps = {
    user: null,
    cname: null,
    productData: null,
  };

  state = {
    choosePayment: null,
    chooseShipmentTemplate: null,
    creditCardIsRegistered: false,
    formData: null,
    isSubmitting: false,
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

  componentDidUpdate() {
    const { adTrack, productData } = this.props;
    const { formData } = this.state;

    if (productData && this.needToTrackViewProduct) {
      setTimeout(() => {
        adTrack('ViewProduct', { product: productData });
        this.needToTrackViewProduct = false;
      }, 5000);
    }

    if (formData) this.formRef.current.submit();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  submit = e => {
    e.preventDefault();

    const { form, updateOrderInfo } = this.props;
    const { validateFields } = form;

    validateFields(
      async (
        err,
        { quantity, variant, userEmail, address, ...filedsValue },
      ) => {
        if (!err) {
          const {
            location: { host: domain, pathname },
            locale,
            user,
            cname,
            transformLocale,
            goTo,
            adTrack,
            getData,
            productData,
            redirectPage,
            dispatchAction,
          } = this.props;

          this.setState({ isSubmitting: true });

          const { choosePayment, creditCardIsRegistered } = this.state;
          const { id: productId } = productData || {};
          const [variantId] = variant.slice(-1);
          const orderData = {
            ...filedsValue,
            sourcePage: 'lp',
            domain,
            locale,
            userEmail: userEmail || user.email,
            products: [
              {
                productId,
                variantId,
                quantity,
              },
            ],
            creditCardIsRegistered,
            choosePayment,
            address,
            ...(Object.values(TAIWAN).includes(address?.[0]) && {
              postalCode: await fetchStreamName(address).then(({ zip }) => zip),
            }),
          };

          const result = await getData(...getCreateOrderQuery(orderData));

          if (this.isUnmounted) return;

          const { id, orderNo, error, formData } =
            result?.data?.createOrderList?.[0] || {};

          if (error || !id) {
            notification.error({
              message: transformLocale(LOCALE.PAY_FILE),
              description: error || '',
            });

            this.setState({ isSubmitting: false });
          } else {
            notification.success({
              message: transformLocale(LOCALE.PAY_SUCCESS),
            });

            adTrack(
              'Purchase',
              {
                ...this.storeComputeOrderList,
                ...this.storeComputeOrderList.categories[0],
                orderNo,
                cname,
              },
              () => {
                if (this.isUnmounted) return;

                if (formData && formData.url) {
                  if (
                    /testmaple2.neweb.com.tw\/CashSystemFrontEnd\/Query/.test(
                      formData.url,
                    )
                  ) {
                    dispatchAction('emptyCart');
                    goTo({ pathname: `/ezpay/cvcode/${id}` });
                    return;
                  }

                  if (formData.type === 'GET') {
                    window.location = formData.url;
                    return;
                  }

                  this.setState({ formData, isSubmitting: false });
                  return;
                }

                updateOrderInfo({}, true);
                this.setState({ isSubmitting: false });

                if (pathname === redirectPage)
                  this.paymentInfoRef.current.computeOrderList();
                else goTo({ pathname: redirectPage });
              },
            );
          }
        }
      },
    );
  };

  render() {
    const {
      colors,
      isLogin,
      transformLocale,
      form,
      productData,
      id,
      contentWidth,
      agreedMatters,
      ...props
    } = this.props;
    const {
      choosePayment,
      chooseShipmentTemplate,
      formData,
      isSubmitting,
    } = this.state;

    const { getFieldsError, validateFieldsAndScroll } = form;
    const { url, params } = formData || { params: {} };

    return (
      <form
        ref={this.formRef}
        style={styles.root}
        id={id}
        className={`landingPage-${id}`}
        {...(formData
          ? {
              action: url,
              acceptCharset: /hitrust/.test(url) ? 'big5' : 'utf8',
              method: 'POST',
            }
          : { onSubmit: this.submit })}
      >
        <Style
          scopeSelector={`.landingPage-${id}`}
          rules={styles.modifyAntdStyle(colors)}
        />

        {createFormData(
          Object.keys(params).map(key => ({
            name: key,
            value: params[key] && key === 'orderdesc' ? ' ' : params[key],
          })),
        )}

        <StyleRoot style={styles.content(contentWidth)}>
          <PaymentInfo
            {...props}
            {...productData}
            moduleId={id}
            ref={this.paymentInfoRef}
            form={form}
            changeChoosePayment={payment =>
              this.setState({ choosePayment: payment })
            }
            changeChooseShipmentTemplate={template =>
              this.setState({ chooseShipmentTemplate: template })
            }
            updateComputeOrderList={computeOrderList => {
              this.storeComputeOrderList = computeOrderList;
            }}
          />

          <ReceiverInfo
            {...props}
            form={form}
            chooseShipmentTemplate={chooseShipmentTemplate}
            toggleLogin={this.toggleLogin}
          />

          <CreditCardFormItem
            style={styles.formItem}
            titleStyle={styles.title(colors)}
            rootStyle={styles.block}
            form={form}
            choosePayment={choosePayment}
            changeCreditCardIsRegistered={isRegistered =>
              this.setState({ creditCardIsRegistered: isRegistered })
            }
          />
        </StyleRoot>

        <Divider style={{ ...styles.title(colors), ...styles.argeementText }}>
          {transformLocale(LOCALE.AGREEMENT)}
        </Divider>

        <StyleRoot style={styles.content(contentWidth)}>
          <div style={styles.agreementInfo(colors)}>
            {agreedMatters.split(/\n/).map((text, index) => (
              /* eslint-disable react/no-array-index-key */
              <div key={index}>{text}</div>
              /* eslint-enable react/no-array-index-key */
            ))}
          </div>

          <Button
            style={styles.submitButton(colors)}
            type="primary"
            htmlType="submit"
            disabled={(fieldsError =>
              Object.keys(fieldsError).some(field => fieldsError[field]))(
              getFieldsError(),
            )}
            onClick={() => validateFieldsAndScroll()}
            loading={isSubmitting}
          >
            {transformLocale(LOCALE.AGREE_SUBMIT)}
          </Button>
        </StyleRoot>
      </form>
    );
  }
}
