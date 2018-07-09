import React from 'react';
import PropTypes from 'prop-types';
import areEqual from 'fbjs/lib/areEqual';
import UserAgent from 'fbjs/lib/UserAgent';
import radium from 'radium';
import { Form, Select, Collapse } from 'antd';

import { enhancer } from 'layout';
import { ID_TYPE, COLOR_TYPE, STORE_SETTING_TYPE } from 'constants/propTypes';

import Coupon from './coupon';
import { FILTER_ALLPAY_PLAYFORM } from './constants';
import * as LOCALE from './locale';
import * as styles from './styles';

const { Item: FormItem } = Form;
const { Option } = Select;
const { Panel } = Collapse;

@enhancer
@radium
/**
 * @prop {Function} changeChooseShipment - Use this function to get shipment which is chosen.
 */
export default class PayemntDefaultFormItem extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,
    transformLocale: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,

    /** props */
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
    const { transformLocale, form, paymentList, shipmentList } = nextProps;
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
            errors: [new Error(transformLocale(LOCALE.CHOOSE_PAYMENY_ERROR))],
          },
        });
      }

      if (shipmentId && !chooseShipment.shipmentId) {
        setFields({
          shipmentId: {
            value: undefined,
            errors: [new Error(transformLocale(LOCALE.CHOOSE_SHIPMENT_ERROR))],
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
      colors,
      storeSetting,
      transformLocale,
      hasStoreAppPlugin,
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
    const { activityVersion } = storeSetting;

    return (
      <React.Fragment>
        <FormItem style={style}>
          {getFieldDecorator('paymentId', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
            ],
          })(
            <Select
              placeholder={transformLocale(LOCALE.PAYMENT)}
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
                header={transformLocale(LOCALE.PAYMENT_DESCRIPTION)}
                style={styles.panel(colors)}
              >
                {choosePayment.description}
              </Panel>
            </Collapse>
          )}
        </FormItem>

        <FormItem style={style}>
          {getFieldDecorator('shipmentId', {
            rules: [
              {
                required: true,
                message: transformLocale(LOCALE.IS_REQUIRED),
              },
            ],
          })(
            <Select
              placeholder={transformLocale(LOCALE.SHIPMENT)}
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
                header={transformLocale(LOCALE.SHIPMENT_DESCRIPTION)}
                style={styles.panel(colors)}
              >
                {chooseShipment.description}
              </Panel>
            </Collapse>
          )}
        </FormItem>

        {!(activityVersion === 2 && hasStoreAppPlugin('coupon')) ? null : (
          <Coupon
            {...couponInfo}
            style={style}
            form={form}
            computeOrderList={computeOrderList}
          />
        )}
      </React.Fragment>
    );
  }
}
