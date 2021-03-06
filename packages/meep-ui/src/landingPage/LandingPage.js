import React, { useState } from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import { Form, Button, Divider } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import useFinish from '@meepshop/landing-page/lib/hooks/useFinish';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';
import GmoCreditCardForm from '@meepshop/form-gmo-credit-card';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  URL_TYPE,
  COLOR_TYPE,
  ISLOGIN_TYPE,
  CONTENT_WIDTH_TYPE,
} from 'constants/propTypes';
import buildVariantsTree from 'utils/buildVariantsTree';

import PaymentInfo from './paymentInfo';
import ReceiverInfo from './ReceiverInfo';
import useLandingPageProduct from './hooks/useLandingPageProduct';
import { ADDITION_TYPE } from './constants';
import * as styles from './styles';

const { Item: FormItem } = Form;

@enhancer
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withHook(({ user, redirectPage, params }) => {
  const { product, orders, loading } = useLandingPageProduct(params?.ids);
  const [form] = Form.useForm();
  const [storeComputeOrderList, setStoreComputeOrderList] = useState(null);
  const [choosePayment, setChoosePayment] = useState(null);

  return {
    ...useFinish({
      landingPageModule: {
        viewer: { ...user, orders },
        product,
        redirectPage: {
          __typename: 'CustomLink',
          href: redirectPage,
          newWindow: false,
          tracking: null,
        },
      },
      order: storeComputeOrderList,
      payment: choosePayment,
      form,
    }),
    productData: product,
    loading,
    setStoreComputeOrderList,
    choosePayment,
    setChoosePayment,
    form,
  };
})
@buildVariantsTree('productData')
@withTranslation('landing-page')
@radium
export default class LandingPage extends React.PureComponent {
  paymentInfoRef = React.createRef();

  needToTrackViewProduct = true;

  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,

    /** @buildVariantsTree moduleProps.productData */
    productData: PropTypes.shape({
      id: ID_TYPE.isRequired,
    }),

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
    productData: null,
  };

  state = {
    chooseShipmentTemplate: null,
  };

  componentDidUpdate() {
    const { adTrack, productData } = this.props;

    if (productData && this.needToTrackViewProduct) {
      setTimeout(() => {
        if (!this.needToTrackViewProduct) return;

        adTrack.viewProduct({
          id: productData.id,
          title: productData.title,
          price: productData.variants[0].totalPrice,
        });
        this.needToTrackViewProduct = false;
      }, 5000);
    }
  }

  render() {
    const {
      /** context */
      colors,
      isLogin,

      /** props */
      t,
      productData,
      id,
      contentWidth,
      agreedMatters,
      loading,
      onFinish,
      setStoreComputeOrderList,
      choosePayment,
      setChoosePayment,
      form,
      ...props
    } = this.props;
    const { chooseShipmentTemplate } = this.state;

    return (
      <Form
        id={id}
        style={styles.root}
        className={`landingPage-${id}`}
        form={form}
        onFinish={onFinish}
        scrollToFirstError
      >
        <Style
          scopeSelector={`.landingPage-${id}`}
          rules={styles.modifyAntdStyle(colors)}
        />

        <StyleRoot style={styles.content(contentWidth)}>
          <FormItem shouldUpdate noStyle>
            {subForm => (
              <PaymentInfo
                {...props}
                {...productData}
                moduleId={id}
                ref={this.paymentInfoRef}
                form={subForm}
                changeChoosePayment={setChoosePayment}
                changeChooseShipmentTemplate={template =>
                  this.setState({ chooseShipmentTemplate: template })
                }
                updateComputeOrderList={setStoreComputeOrderList}
              />
            )}
          </FormItem>

          <FormItem shouldUpdate noStyle>
            {subForm => (
              <ReceiverInfo
                {...props}
                form={subForm}
                choosePaymentTemplate={(choosePayment || {}).template}
                chooseShipmentTemplate={chooseShipmentTemplate}
                toggleLogin={this.toggleLogin}
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
        </StyleRoot>

        <Divider style={{ ...styles.title(colors), ...styles.argeementText }}>
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

          <FormItem shouldUpdate noStyle>
            {({ getFieldsError }) => (
              <Button
                style={styles.submitButton(colors)}
                type="primary"
                htmlType="submit"
                disabled={getFieldsError().some(
                  ({ errors }) => errors.length !== 0,
                )}
                loading={loading}
              >
                {t('agree-submit')}
              </Button>
            )}
          </FormItem>
        </StyleRoot>
      </Form>
    );
  }
}
