import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';
import uuid from 'uuid';
import queryString from 'query-string';

import ConvenienceStoreMap from '@store/convenience-store-map';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  LOCATION_TYPE,
  COLOR_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
} from 'constants/propTypes';
import createFormData from 'utils/createFormData';

import {
  SHIPMENT_STORE_FIELDS,
  EZSHIP_LINK,
  CONVENIENCE_STORE_SHIPMENT_TYPE_ENUM,
  ECPAY_CONVENIENCE_STORE_TYPE_ENUM,
  EZSHIP_CONVENIENCE_STORE_TYPE_ENUM,
} from './constants';
import * as LOCALE from './locale';
import styles from './styles/chooseShipmentStore.less';

const { Item: FormItem } = Form;

@enhancer
@radium
export default class ChooseShipmentStore extends React.PureComponent {
  formRef = React.createRef();

  rootDOM = document.querySelector('body');

  formDOM = document.createElement('div');

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
    shipmentTemplate: null,
    tradeNo: null,
    ezship: null,
    allpay: null,
    openConvenienceStoreMap: false,
    inHouseConvenienceStoreMapEnabled: false,
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { shipmentId, shipmentTemplate } = nextProps;

    if (
      shipmentId !== preState.shipmentId ||
      shipmentTemplate !== preState.shipmentTemplate
    ) {
      return {
        shipmentId,
        shipmentTemplate,
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
    const { getData } = this.props;
    const { shipmentId, shipmentTemplate } = this.state;

    if (!shipmentId) return;

    // 超取地圖白名單
    const {
      data: {
        viewer: {
          store: {
            experiment: { inHouseConvenienceStoreMapEnabled },
          },
        },
      },
    } = await getData(`
      query getInHouseConvenienceStoreMapEnabled {
        viewer {
          store {
            experiment {
              inHouseConvenienceStoreMapEnabled
            }
          }
        }
      }
    `);

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

    if (
      this.isUnmounted ||
      !result?.data?.getStoreShipmentList ||
      (shipmentTemplate === 'allpay' &&
        !result?.data?.getStoreShipmentList.data[0].accountInfo.allpay
          ?.merchantID) ||
      (shipmentTemplate === 'ezship' &&
        !result?.data?.getStoreShipmentList.data[0].accountInfo.ezship?.suID)
    )
      return;

    this.setState({
      ...result.data.getStoreShipmentList.data[0].accountInfo,
      tradeNo: uuid.v4(),
      inHouseConvenienceStoreMapEnabled,
    });
  };

  goToShipmentStore = async () => {
    const { location, getApiUrl, form } = this.props;
    const { tradeNo, shipmentTemplate } = this.state;

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

  confirmStore = store => {
    const {
      form: { setFieldsValue },
    } = this.props;

    // fix ios body overflow: hidden bug
    if (window.getComputedStyle(document.body).position === 'fixed') {
      this.setState({ openConvenienceStoreMap: false }, () => {
        window.scrollTo(0, 1000);
      });
    } else {
      this.setState({ openConvenienceStoreMap: false });
    }

    setFieldsValue(store);
  };

  closeConvenienceStoreMap = () => {
    // fix ios body overflow: hidden bug
    if (window.getComputedStyle(document.body).position === 'fixed') {
      this.setState({ openConvenienceStoreMap: false }, () => {
        window.scrollTo(0, 1000);
      });
    } else {
      this.setState({ openConvenienceStoreMap: false });
    }
  };

  render() {
    const { colors, transformLocale, getApiUrl, form } = this.props;
    const {
      tradeNo,
      ezship,
      allpay,
      shipmentTemplate,
      inHouseConvenienceStoreMapEnabled,
      openConvenienceStoreMap,
    } = this.state;

    if (!tradeNo || !(ezship || allpay)) return null;

    const { getFieldDecorator, getFieldValue } = form;
    const url = getApiUrl(`/external/${shipmentTemplate}/map/${tradeNo}`);

    return (
      <>
        <Button
          className={styles.root}
          type="primary"
          style={{
            color: colors[2],
            borderColor: colors[4],
            background: colors[4],
          }}
          onClick={
            inHouseConvenienceStoreMapEnabled
              ? () => this.setState({ openConvenienceStoreMap: true })
              : this.goToShipmentStore
          }
        >
          {transformLocale(
            SHIPMENT_STORE_FIELDS.map(field => getFieldValue(field)).some(
              value => value,
            )
              ? LOCALE.RECHOOSE_STORE
              : LOCALE.CHOOSE_STORE,
          )}
        </Button>

        {SHIPMENT_STORE_FIELDS.map(field =>
          !getFieldValue(field) ? null : (
            <div
              key={getFieldValue(field)}
              className={styles.convenienceStoreInfo}
            >
              {transformLocale(LOCALE.CONVENIENCE_STORE[field])}：
              {getFieldValue(field)}
            </div>
          ),
        )}

        {SHIPMENT_STORE_FIELDS.map((fieldName, index) => (
          <FormItem key={fieldName} className={styles.hideFormItem}>
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

        {!openConvenienceStoreMap ? null : (
          <ConvenienceStoreMap
            shipmentType={CONVENIENCE_STORE_SHIPMENT_TYPE_ENUM(
              shipmentTemplate,
            )}
            storeTypes={
              shipmentTemplate === 'allpay'
                ? ECPAY_CONVENIENCE_STORE_TYPE_ENUM(allpay.logisticsSubType)
                : EZSHIP_CONVENIENCE_STORE_TYPE_ENUM
            }
            close={this.closeConvenienceStoreMap}
            confirmStore={this.confirmStore}
          />
        )}

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
