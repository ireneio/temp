import React from 'react';
import PropTypes from 'prop-types';
import { areEqual, UserAgent } from 'fbjs';
import radium from 'radium';
import { Form, Select, Collapse } from 'antd';

import { withTranslation } from '@meepshop/locales';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';

import Coupon from './coupon';
import { FILTER_ALLPAY_PLAYFORM } from './constants';
import * as styles from './styles';

const { Item: FormItem } = Form;
const { Option } = Select;
const { Panel } = Collapse;

@withTranslation('payment-default-form-item')
@enhancer
@radium
export default class PayemntDefaultFormItem extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
    style: PropTypes.shape({}),
    couponInfo: PropTypes.shape({
      errorObj: PropTypes.shape({}),
      activityInfo: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
    }),
    form: PropTypes.shape({
      // from parent component with ant.Form.create()
      getFieldsValue: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
      setFieldsValue: PropTypes.func.isRequired,
    }).isRequired,
    computeOrderList: PropTypes.func.isRequired,
    paymentList: PropTypes.arrayOf(
      PropTypes.shape({
        paymentId: ID_TYPE.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        accountInfo: PropTypes.shape({
          allpay: PropTypes.shape({
            ChoosePayment: PropTypes.oneOf([
              'Credit',
              'WebATM',
              'ATM',
              'CVS',
              'BARCODE',
            ]).isRequired,
          }),
        }).isRequired,
      }).isRequired,
    ).isRequired,
    shipmentList: PropTypes.arrayOf(
      PropTypes.shape({
        shipmentId: ID_TYPE.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  };

  static defaultProps = {
    style: {},
    couponInfo: {},
  };

  state = {
    choosePayment: {},
    chooseShipment: {},
    paymentIds: [], // eslint-disable-line react/no-unused-state
    paymentList: [],
    shipmentIds: [], // eslint-disable-line react/no-unused-state
    shipmentList: [],
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { t, form, paymentList, shipmentList } = nextProps;
    const { getFieldsValue, setFields } = form;
    const { paymentId, shipmentId } = getFieldsValue([
      'paymentId',
      'shipmentId',
    ]);
    const paymentIds = paymentList.map(({ paymentId: id }) => id);
    const shipmentIds = shipmentList.map(({ shipmentId: id }) => id);
    const choosePayment =
      paymentList.find(({ paymentId: id }) => id === paymentId) || {};
    const chooseShipment =
      shipmentList.find(({ shipmentId: id }) => id === shipmentId) || {};

    // FIXME write utils
    if (
      !areEqual(paymentIds, preState.paymentIds) ||
      !areEqual(shipmentIds, preState.shipmentIds)
    ) {
      if (paymentId && !choosePayment.paymentId) {
        setFields({
          paymentId: {
            value: undefined,
            errors: [new Error(t('choose-paymeny-error'))],
          },
        });
      }

      if (shipmentId && !chooseShipment.shipmentId) {
        setFields({
          shipmentId: {
            value: undefined,
            errors: [new Error(t('choose-shipment-error'))],
          },
        });
      }

      const nextState = {
        paymentIds,
        choosePayment,
        paymentList: !(paymentId && paymentList.length === 0)
          ? paymentList
          : [
              {
                paymentId,
                name: '',
              },
            ],
        shipmentIds,
        chooseShipment,
        shipmentList: !(shipmentId && shipmentList.length === 0)
          ? shipmentList
          : [
              {
                shipmentId,
                name: '',
              },
            ],
      };

      if (global.window) {
        const isIgnorePlatform = FILTER_ALLPAY_PLAYFORM.reduce(
          (result, platformName) =>
            result || UserAgent.isPlatform(platformName),
          false,
        );

        if (isIgnorePlatform) {
          return {
            ...nextState,
            paymentList: paymentList.filter(({ accountInfo }) => {
              const { ChoosePayment } = accountInfo.allpay || {};

              return !['WebATM', 'BARCODE'].includes(ChoosePayment);
            }),
          };
        }
      }

      return nextState;
    }

    if (
      (paymentId && paymentList.length === 0) ||
      (shipmentId && shipmentList.length === 0)
    ) {
      return {
        choosePayment,
        paymentList:
          paymentList.length !== 0
            ? paymentList
            : [
                {
                  paymentId,
                  name: 'loading...',
                  isFake: true,
                },
              ],
        chooseShipment,
        shipmentList:
          shipmentList.length !== 0
            ? shipmentList
            : [
                {
                  shipmentId,
                  name: 'loading...',
                  isFake: true,
                },
              ],
      };
    }

    if (
      paymentId !== preState.choosePayment.paymentId ||
      shipmentId !== preState.chooseShipment.shipmentId
    ) {
      return {
        choosePayment:
          paymentList.find(({ paymentId: id }) => id === paymentId) || {},
        chooseShipment:
          shipmentList.find(({ shipmentId: id }) => id === shipmentId) || {},
      };
    }

    return null;
  }

  render() {
    const {
      // context
      colors,
      hasStoreAppPlugin,

      // props
      t,
      style,
      couponInfo,
      computeOrderList,
      form,
    } = this.props;
    const {
      choosePayment,
      chooseShipment,
      paymentList,
      shipmentList,
    } = this.state;
    const { getFieldDecorator } = form;

    return (
      <>
        <FormItem style={style}>
          {getFieldDecorator('paymentId', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: t('is-required'),
              },
            ],
          })(
            <Select
              placeholder={t('payment')}
              disabled={paymentList.length === 0 || paymentList[0].isFake}
              onChange={paymentId => {
                computeOrderList({ paymentId });
                this.setState({
                  choosePayment:
                    paymentList.find(({ paymentId: id }) => id === paymentId) ||
                    {},
                });
              }}
            >
              {paymentList.map(({ paymentId: id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>,
          )}

          {!choosePayment.description ? null : (
            <Collapse style={styles.collapse} bordered={false}>
              <Panel
                header={t('payment-description')}
                style={styles.panel(colors)}
              >
                <pre>{choosePayment.description}</pre>
              </Panel>
            </Collapse>
          )}
        </FormItem>

        <FormItem style={style}>
          {getFieldDecorator('shipmentId', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: t('is-required'),
              },
            ],
          })(
            <Select
              placeholder={t('shipment')}
              disabled={shipmentList.length === 0 || shipmentList[0].isFake}
              onChange={shipmentId => {
                computeOrderList({ shipmentId });

                this.setState({
                  chooseShipment:
                    shipmentList.find(
                      ({ shipmentId: id }) => id === shipmentId,
                    ) || {},
                });
              }}
            >
              {shipmentList.map(({ shipmentId: id, name }) => (
                <Option key={id} value={id}>
                  {name}
                </Option>
              ))}
            </Select>,
          )}

          {!chooseShipment.description ? null : (
            <Collapse style={styles.collapse} bordered={false}>
              <Panel
                header={t('shipment-description')}
                style={styles.panel(colors)}
              >
                <pre>{chooseShipment.description}</pre>
              </Panel>
            </Collapse>
          )}
        </FormItem>

        {!hasStoreAppPlugin('coupon') ? null : (
          <Coupon
            {...couponInfo}
            style={style}
            form={form}
            computeOrderList={computeOrderList}
          />
        )}
      </>
    );
  }
}
