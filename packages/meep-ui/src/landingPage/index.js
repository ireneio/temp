import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import { Form, Button, Divider, notification } from 'antd';
import moment from 'moment';
import { areEqual } from 'fbjs';
import uuid from 'uuid/v4';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import LandingPageWrapper from '@meepshop/landing-page';
import withContext from '@store/utils/lib/withContext';
import adTrackContext from '@store/ad-track';
import GmoCreditCardForm from '@store/gmo-credit-card-form';

import { enhancer } from 'layout/DecoratorsRoot';
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
import createFormData from 'utils/createFormData';
import findDOMTop from 'utils/findDOMTop';

import PaymentInfo from './paymentInfo';
import ReceiverInfo from './ReceiverInfo';
import { ADDITION_TYPE } from './constants';
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
@withContext(adTrackContext)
@withTranslation('landing-page')
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
    t: PropTypes.func.isRequired,
    adTrack: PropTypes.shape({}).isRequired,
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

  componentDidUpdate(prevProps, prevState) {
    const { adTrack, productData } = this.props;
    const { formData } = this.state;

    if (productData && this.needToTrackViewProduct) {
      setTimeout(() => {
        adTrack.viewProduct({ id: productData.id, title: productData.title });
        this.needToTrackViewProduct = false;
      }, 5000);
    }

    if (formData && !areEqual(formData, prevState.formData))
      this.formRef.current.submit();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  submit = createOrderInLandingPage => e => {
    e.preventDefault();

    const { form, updateOrderInfo } = this.props;
    const { validateFields } = form;

    validateFields(
      async (
        err,
        {
          quantity = 1,
          variant,

          paymentId,
          shipmentId,
          coupon,

          userEmail,
          userName,
          userMobile,

          name,
          mobile,
          notes,

          // convenience-store or address
          addressAndZipCode,
          street,
          CVSStoreID,
          CVSStoreName,
          CVSAddress,
          cvsType,
          cvsCode,

          // invoice
          invoice,
          invoiceTitle,
          invoiceVAT,
          invoiceAddress,
          invoiceEInvoiceNumber,
          invoiceDonate,

          // gmo payment
          isRememberCard,
          cardHolderName,
          cardNumber,
          securityCode,
          expire,
          installmentCode,
        },
      ) => {
        if (!err) {
          const {
            /** context */
            location: { host: domain, pathname },
            user,
            goTo,
            dispatchAction,

            /** props */
            t,
            adTrack,
            productData,
            redirectPage,
          } = this.props;
          const { isSubmitting } = this.state;

          if (isSubmitting) return;

          this.setState({ isSubmitting: true });

          const { choosePayment } = this.state;
          const { id: productId } = productData || {};
          const [variantId] = variant.slice(-1);
          const { data, error } = await createOrderInLandingPage({
            variables: {
              createOrderList: {
                idempotentKey: uuid(),
                environment: {
                  domain,
                  sourcePage: 'lp',
                },
                isPayment: true,
                products: [
                  {
                    productId,
                    variantId,
                    quantity,
                  },
                ],
                coupon,
                ...(!addressAndZipCode
                  ? {}
                  : {
                      address: {
                        zipCode: addressAndZipCode.zipCode,
                        countryId: addressAndZipCode.address[0],
                        cityId: addressAndZipCode.address[1],
                        areaId: addressAndZipCode.address[2],
                        street,
                      },
                    }),
                payments: [
                  {
                    paymentId,
                    redirectUrl: !redirectPage
                      ? null
                      : `${window.location.origin}${redirectPage}`,
                    ...(choosePayment.template !== 'gmo' ||
                    choosePayment.accountInfo.gmo.paymentType !== 'Credit'
                      ? {}
                      : {
                          gmo: {
                            isRememberCard,
                            cardHolderName,
                            cardNumber: cardNumber?.join(''),
                            securityCode,
                            expireYear: expire?.format('YYYY'),
                            expireMonth: expire?.format('M'),
                            ...(!installmentCode
                              ? {}
                              : {
                                  installmentCode:
                                    installmentCode instanceof Array
                                      ? installmentCode[
                                          installmentCode.length - 1
                                        ]
                                      : installmentCode,
                                }),
                          },
                        }),
                  },
                ],
                shipments: [
                  {
                    shipmentId,
                    recipient: {
                      name,
                      email: userEmail || user.email,
                      mobile,
                      comment: notes,
                      receiverStoreID: CVSStoreID,
                      receiverStoreName: CVSStoreName,
                      receiverStoreAddress: CVSAddress,
                    },
                  },
                ],
                cvsType,
                cvsCode,
                userInfo: {
                  name: userName || name,
                  email: userEmail || user.email,
                  mobile: userMobile || mobile,
                },
                ...(!invoice
                  ? {}
                  : {
                      invoice: {
                        type: invoice[0],
                        ...(invoice[1] === 'MEMBERSHIP' ||
                        invoice[1] === 'MOBILE_BARCODE' ||
                        invoice[1] === 'CITIZEN_DIGITAL_CERTIFICATE'
                          ? {
                              method: 'CARRIER',
                              carrier: {
                                type: invoice[1],
                                code: invoiceEInvoiceNumber,
                              },
                            }
                          : {
                              method: invoice[1],
                            }),

                        // method = TRIPLICATE
                        address: invoiceAddress,
                        title: invoiceTitle,
                        ban: invoiceVAT,

                        // method = DONATION
                        loveCode: invoiceDonate,
                      },
                    }),
              },
            },
          });

          if (this.isUnmounted) return;

          const { id, orderNo, error: createOrderError, formData } =
            data?.createOrderList?.[0] || {};

          if (error || createOrderError || !id) {
            const errorMessage = error?.[0]?.message || createOrderError || '';

            notification.error({
              message: t('pay-fail'),
              description: /(<st_code>|七天後關|門市不存在|門市關轉店或為外島|取貨門市店代碼)/.test(
                errorMessage,
              )
                ? '原取件門市暫停服務，請重新選擇！'
                : errorMessage,
            });

            this.setState({ isSubmitting: false });
          } else {
            notification.success({
              message: t('pay-success'),
            });
            const { products, priceInfo } = {
              ...this.storeComputeOrderList,
              ...this.storeComputeOrderList.categories[0],
            };

            adTrack.purchase({
              orderNo,
              products,
              total: priceInfo.total,
              currency: priceInfo.currency,
              shipmentFee: priceInfo.shipmentFee,
              paymentFee: priceInfo.paymentFee,
            });

            if (this.isUnmounted) return;

            if (formData && formData.url) {
              if (/CashSystemFrontEnd\/Query/.test(formData.url)) {
                dispatchAction('emptyCart');
                goTo({
                  pathname: `/ezpay/cvcode/${id}`,
                  params: {
                    search: !redirectPage
                      ? {}
                      : {
                          redirectUrl: redirectPage,
                        },
                  },
                });
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
          }
        }
      },
    );
  };

  render() {
    const {
      /** context */
      colors,
      isLogin,

      /** props */
      t,
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
      <LandingPageWrapper>
        {({ createOrderInLandingPage }) => (
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
              : { onSubmit: this.submit(createOrderInLandingPage) })}
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
                choosePaymentTemplate={(choosePayment || {}).template}
                chooseShipmentTemplate={chooseShipmentTemplate}
                toggleLogin={this.toggleLogin}
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
            </StyleRoot>

            <Divider
              style={{ ...styles.title(colors), ...styles.argeementText }}
            >
              {t('agreement')}
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
                {t('agree-submit')}
              </Button>
            </StyleRoot>
          </form>
        )}
      </LandingPageWrapper>
    );
  }
}
