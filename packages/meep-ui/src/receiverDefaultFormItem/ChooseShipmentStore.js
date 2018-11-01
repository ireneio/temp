import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';
import uuid from 'uuid';
import queryString from 'query-string';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  LOCATION_TYPE,
  COLOR_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
} from 'constants/propTypes';
import createFormData from 'utils/createFormData';

import { SHIPMENT_STORE_FIELDS, EZSHIP_LINK } from './constants';
import * as LOCALE from './locale';
import * as styles from './styles/chooseShipmentStore';
import getDefaultStoreData from './utils/getDefaultStoreData';

const { Item: FormItem } = Form;

@enhancer
@radium
export default class ChooseShipmentStore extends React.PureComponent {
  formRef = React.createRef();

  rootDOM = document.querySelector('body');

  formDOM = document.createElement('div');

  storeData = getDefaultStoreData(this.props);

  static propTypes = {
    /** context */
    location: LOCATION_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    getApiUrl: PropTypes.func.isRequired,

    /** props */
    form: PropTypes.shape({
      getFieldsValue: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired,
    }).isRequired,
    shipmentId: ID_TYPE.isRequired, // eslint-disable-line react/no-unused-prop-types
    shipmentTemplate: SHIPMENT_TEMPLATE_TYPE.isRequired, // eslint-disable-line react/no-unused-prop-types
  };

  state = {
    shipmentId: null,
    tradeNo: null,
    ezship: null,
    allpay: null,
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { shipmentId } = nextProps;

    if (shipmentId !== preState.shipmentId) {
      return {
        shipmentId,
        tradeNo: null,
        ezship: null,
        allpay: null,
      };
    }

    return null;
  }

  componentDidMount() {
    this.getFormArguments();
    this.rootDOM.appendChild(this.formDOM);
  }

  componentDidUpdate() {
    const { tradeNo } = this.state;
    if (!tradeNo) this.getFormArguments();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    this.rootDOM.removeChild(this.formDOM);
  }

  getFormArguments = async () => {
    const { getData, shipmentTemplate } = this.props;
    const { shipmentId } = this.state;

    if (!shipmentId) return;

    // TODO: rewrite query
    const result = await getData(`
      query getStoreShipmentListForChooseShipmentStore {
        getStoreShipmentList(search: {
          filter: {
            and: {
              type: "ids"
              ids: ["${shipmentId}"]
            }
          }
        }) {
          data {
            accountInfo {
              ${
                shipmentTemplate !== 'allpay'
                  ? ''
                  : `
                allpay: allPay { # TODO rename
                  host
                  merchantID
                  logisticsType
                  logisticsSubType
                  isCollection
                }
              `
              }
              ${
                shipmentTemplate !== 'ezship'
                  ? ''
                  : `
                ezship {
                  suID
                }
              `
              }
            }
          }
        }
      }
    `);

    if (this.isUnmounted || !result?.data?.getStoreShipmentList) return;

    this.setState({
      ...result.data.getStoreShipmentList.data[0].accountInfo,
      tradeNo: uuid.v4(),
    });
  };

  goToShipmentStore = async () => {
    const { location, getApiUrl, form, shipmentTemplate } = this.props;
    const { tradeNo } = this.state;

    const { host, pathname, search } = location;
    const { getFieldsValue } = form;
    const queryObj = queryString.parse(search);
    const url = `http://${host}${pathname}?${queryString.stringify({
      ...queryObj,
      tradeNo,
      shipmentTemplate,
    })}#choose-shipment-store`;
    const info = {
      ...getFieldsValue(),
      storePreviousPageUrl: window.storePreviousPageUrl,
    };

    delete info.CVSStoreID;
    delete info.CVSStoreName;
    delete info.CVSAddress;

    await fetch(getApiUrl(`/external/${shipmentTemplate}/saveInfo`), {
      method: 'POST',
      body: JSON.stringify({
        uuid: tradeNo,
        url,
        info,
      }),
    });

    this.formRef.current.submit();
  };

  render() {
    const {
      colors,
      transformLocale,
      getApiUrl,
      form,
      shipmentTemplate,
    } = this.props;
    const { tradeNo, ezship, allpay } = this.state;

    if (!tradeNo || !(ezship || allpay)) return null;

    const { getFieldDecorator } = form;
    const url = getApiUrl(`/external/${shipmentTemplate}/map/${tradeNo}`);

    return (
      <>
        <Button
          style={styles.root(colors)}
          type="primary"
          onClick={this.goToShipmentStore}
        >
          {transformLocale(
            this.storeData.some(text => text)
              ? LOCALE.RECHOOSE_STORE
              : LOCALE.CHOOSE_STORE,
          )}
        </Button>

        {this.storeData.map(
          text => (!text ? null : <div key={text}>{text}</div>),
        )}

        {SHIPMENT_STORE_FIELDS.map((fieldName, index) => (
          <FormItem key={fieldName} style={styles.hideFormItem}>
            {getFieldDecorator(fieldName, {
              validateTrigger: 'onBlur',
              rules: [
                {
                  required: true,
                  message:
                    index !== 0
                      ? ' '
                      : transformLocale(LOCALE.NOT_CHOOSE_STORE),
                },
              ],
            })(<Input type="hidden" />)}
          </FormItem>
        ))}

        {ReactDOM.createPortal(
          <form
            ref={this.formRef}
            action={
              shipmentTemplate === 'allpay'
                ? `${allpay.host}/Express/map`
                : EZSHIP_LINK
            }
            method="POST"
          >
            {createFormData(
              shipmentTemplate === 'allpay'
                ? [
                    {
                      name: 'MerchantID',
                      value: allpay.merchantID,
                    },
                    {
                      name: 'LogisticsType',
                      value: allpay.logisticsType,
                    },
                    {
                      name: 'LogisticsSubType',
                      value: allpay.logisticsSubType,
                    },
                    {
                      name: 'IsCollection',
                      value: allpay.isCollection,
                    },
                    {
                      name: 'MerchantTradeNo',
                      value: tradeNo,
                    },
                    {
                      name: 'ServerReplyURL',
                      value: url,
                    },
                  ]
                : [
                    {
                      name: 'suID',
                      value: ezship.suID,
                    },
                    {
                      name: 'processID',
                      value: tradeNo,
                    },
                    {
                      name: 'rtURL',
                      value: url,
                    },
                  ],
            )}
          </form>,

          this.formDOM,
        )}
      </>
    );
  }
}
