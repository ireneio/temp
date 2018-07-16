import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import EditIcon from 'react-icons/lib/fa/edit';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, PAYMENT_TEMPLATE_TYPE } from 'constants/propTypes';

import Form from './Form';
import * as LOCALE from './locale';
import * as styles from './styles';

const getDefaultIsModify = ({ form }) => {
  const { getFieldsValue } = form;
  const creditCartData = getFieldsValue([
    'creditCardOwnerName',
    'creditCardNumber',
    'creditCardSecurityCode',
    'creditCardExpiration',
    'creditCardInstallment',
  ]);

  return Object.keys(creditCartData).reduce(
    (result, key) => result || Boolean(creditCartData[key]),
    false,
  );
};

@enhancer
@radium
class CreditCardFormItem extends React.PureComponent {
  isGetingData = false;

  static propTypes = {
    /** context */
    transformLocale: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    style: PropTypes.shape({}),
    rootStyle: PropTypes.shape({}),
    titleStyle: PropTypes.shape({}),
    form: PropTypes.shape({
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    changeCreditCardIsRegistered: PropTypes.func.isRequired,
    paymentId: ID_TYPE.isRequired,
    isInstallment: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    style: {},
    rootStyle: {},
    titleStyle: {},
  };

  state = {
    paymentId: null, // eslint-disable-line react/no-unused-state
    userInfo: null,
    isModified: getDefaultIsModify(this.props),
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { paymentId } = nextProps;

    if (paymentId !== preState.paymentId) {
      return {
        paymentId,
        userInfo: null,
        isModified: preState.userInfo ? false : preState.isModified,
      };
    }

    return null;
  }

  componentDidMount() {
    this.getCreditUser();
  }

  componentDidUpdate() {
    const { userInfo } = this.state;

    if (!userInfo && !this.isGetingData) this.getCreditUser();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  getCreditUser = async () => {
    this.isGetingData = true;

    const { getData, changeCreditCardIsRegistered, paymentId } = this.props;
    const { data: result } = await getData(`
      query {
        userInfo: getGMOUser(getGMOUser: {
          storePaymentId: "${paymentId}"
        }) {
          exist
          cardNumberFront
          cardNumberLater
        }
      }
    `);

    if (this.isUnmounted) return;

    const { userInfo } = result;

    changeCreditCardIsRegistered(userInfo.exist);
    this.isGetingData = false;
    this.setState({ userInfo });
  };

  render() {
    const {
      transformLocale,
      style,
      rootStyle,
      titleStyle,
      form,
      isInstallment,
    } = this.props;
    const { userInfo, isModified } = this.state;
    const { exist, cardNumberFront, cardNumberLater } = userInfo || {
      exist: false,
    };

    return (
      <div style={rootStyle}>
        <h3 style={[styles.title, titleStyle]}>
          {transformLocale(LOCALE.CREDIT_CARD_INFO)}

          {!exist ? null : (
            <div
              style={styles.edit}
              onClick={() => this.setState({ isModified: !isModified })}
            >
              {isModified ? null : <EditIcon />}

              {transformLocale(isModified ? LOCALE.CANCEL : LOCALE.EDIT)}
            </div>
          )}
        </h3>

        {exist && !isModified ? (
          <div style={style}>
            {cardNumberFront}********{cardNumberLater}
          </div>
        ) : (
          <Form style={style} form={form} isInstallment={isInstallment} />
        )}
      </div>
    );
  }
}

const CreditCardWrapper = ({ choosePayment, ...props }) =>
  !choosePayment ||
  choosePayment.template !== 'gmo' ||
  choosePayment.accountInfo.gmo.paymentType !== 'Credit' ? null : (
    <CreditCardFormItem
      {...props}
      paymentId={choosePayment.paymentId}
      isInstallment={choosePayment.accountInfo.gmo.isInstallment}
    />
  );

CreditCardWrapper.propTypes = {
  choosePayment: PropTypes.shape({
    paymentId: ID_TYPE.isRequired, // eslint-disable-line react/no-typos
    template: PAYMENT_TEMPLATE_TYPE.isRequired, // eslint-disable-line react/no-typos
    accountInfo: PropTypes.shape({
      gmo: PropTypes.shape({
        isInstallment: PropTypes.bool.isRequired,
      }),
    }).isRequired,
  }),
};

CreditCardWrapper.defaultProps = {
  choosePayment: null,
};

export default CreditCardWrapper;
