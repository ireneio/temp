import React, { useState } from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import { Form, Button, Divider } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import useSubmit from '@meepshop/landing-page/lib/hooks/useSubmit';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';
import GmoCreditCardForm from '@meepshop/gmo-credit-card-form';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  URL_TYPE,
  LOCATION_TYPE,
  COLOR_TYPE,
  ISLOGIN_TYPE,
  CONTENT_WIDTH_TYPE,
} from 'constants/propTypes';
import loadData from 'utils/loadData';
import buildVariantsTree from 'utils/buildVariantsTree';

import PaymentInfo from './paymentInfo';
import ReceiverInfo from './ReceiverInfo';
import { ADDITION_TYPE } from './constants';
import * as styles from './styles';

@enhancer
@loadData(['productData'])
@buildVariantsTree('productData')
@Form.create()
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withHook(({ user, productData, redirectPage, form }) => {
  const [storeComputeOrderList, setStoreComputeOrderList] = useState(null);
  const [choosePayment, setChoosePayment] = useState(null);

  return {
    ...useSubmit({
      viewer: user,
      product: productData,
      redirectPage: {
        __typename: 'CustomLink',
        href: redirectPage,
        newWindow: false,
        tracking: null,
      },
      form,
      order: storeComputeOrderList,
      payment: choosePayment,
    }),
    setStoreComputeOrderList,
    choosePayment,
    setChoosePayment,
  };
})
@withTranslation('landing-page')
@radium
export default class LandingPage extends React.PureComponent {
  paymentInfoRef = React.createRef();

  needToTrackViewProduct = true;

  static propTypes = {
    /** context */
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
      form,
      productData,
      id,
      contentWidth,
      agreedMatters,
      loading,
      onSubmit,
      setStoreComputeOrderList,
      choosePayment,
      setChoosePayment,
      ...props
    } = this.props;
    const { chooseShipmentTemplate } = this.state;

    const { getFieldsError, validateFieldsAndScroll } = form;

    return (
      <form
        style={styles.root}
        id={id}
        className={`landingPage-${id}`}
        onSubmit={onSubmit}
      >
        <Style
          scopeSelector={`.landingPage-${id}`}
          rules={styles.modifyAntdStyle(colors)}
        />

        <StyleRoot style={styles.content(contentWidth)}>
          <PaymentInfo
            {...props}
            {...productData}
            moduleId={id}
            ref={this.paymentInfoRef}
            form={form}
            changeChoosePayment={setChoosePayment}
            changeChooseShipmentTemplate={template =>
              this.setState({ chooseShipmentTemplate: template })
            }
            updateComputeOrderList={setStoreComputeOrderList}
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

          <Button
            style={styles.submitButton(colors)}
            type="primary"
            htmlType="submit"
            disabled={(fieldsError =>
              Object.keys(fieldsError).some(field => fieldsError[field]))(
              getFieldsError(),
            )}
            onClick={() => validateFieldsAndScroll()}
            loading={loading}
          >
            {t('agree-submit')}
          </Button>
        </StyleRoot>
      </form>
    );
  }
}
