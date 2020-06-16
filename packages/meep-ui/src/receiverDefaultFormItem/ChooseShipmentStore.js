import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Form, Input, Button } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import ConvenienceStoreMap from '@store/convenience-store-map';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  COLOR_TYPE,
  SHIPMENT_TEMPLATE_TYPE,
} from 'constants/propTypes';

import {
  SHIPMENT_STORE_FIELDS,
  CONVENIENCE_STORE_FIELDS,
  ECPAY_SHIPMENT_TYPE_ENUM,
  ECPAY_CONVENIENCE_STORE_TYPE_ENUM,
  EZSHIP_CONVENIENCE_STORE_TYPE_ENUM,
} from './constants';
import styles from './styles/chooseShipmentStore.less';

const { Item: FormItem } = Form;

@withTranslation('receiver-default-form-item')
@enhancer
@radium
export default class ChooseShipmentStore extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
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
    allpay: null,
    openConvenienceStoreMap: false,
    scrollY: null,
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const {
      form: { resetFields },
      shipmentId,
      shipmentTemplate,
    } = nextProps;

    if (
      shipmentId !== preState.shipmentId ||
      shipmentTemplate !== preState.shipmentTemplate
    ) {
      SHIPMENT_STORE_FIELDS.forEach(field => resetFields(field));
      CONVENIENCE_STORE_FIELDS.forEach(field => resetFields(field));

      return {
        shipmentId,
        shipmentTemplate,
        allpay: null,
      };
    }

    return null;
  }

  componentDidMount() {
    const { shipmentTemplate, allpay } = this.state;

    if (shipmentTemplate === 'allpay' && !allpay) this.getAllpaySubType();
  }

  componentDidUpdate() {
    const { shipmentTemplate, allpay } = this.state;

    if (shipmentTemplate === 'allpay' && !allpay) this.getAllpaySubType();
  }

  getAllpaySubType = async () => {
    const { getData } = this.props;
    const { shipmentId } = this.state;

    if (!shipmentId) return;

    // TODO: should merge in computeOrder
    const result = await getData(`
      query getStoreShipmentListForChooseShipmentStore {
        viewer {
          store {
            storeShipment(storeShipmentId: "${shipmentId}") {
              accountInfo {
                allpay: allPay { # TODO rename
                  logisticsSubType
                }
              }
            }
          }
        }
      }
    `);

    if (
      !result?.data?.viewer?.store?.storeShipment?.accountInfo.allpay
        ?.logisticsSubType
    )
      return;

    this.setState({
      ...result.data.viewer.store.storeShipment.accountInfo,
    });
  };

  confirmStore = store => {
    const {
      form: { setFieldsValue },
    } = this.props;

    this.closeConvenienceStoreMap();

    setFieldsValue(store);
  };

  closeConvenienceStoreMap = () => {
    // fix ios body overflow: hidden bug
    if (window.getComputedStyle(document.body).position === 'fixed') {
      this.setState({ openConvenienceStoreMap: false }, () => {
        const { scrollY } = this.state;
        window.scrollTo(0, scrollY);
        document.body.style.overflow = '';
      });
    } else {
      this.setState({ openConvenienceStoreMap: false }, () => {
        document.body.style.overflow = '';
      });
    }
  };

  render() {
    const {
      // context
      colors,

      // props
      t,
      form,
    } = this.props;
    const { allpay, shipmentTemplate, openConvenienceStoreMap } = this.state;

    if (shipmentTemplate === 'allpay' && !allpay) return null;

    const { getFieldDecorator, getFieldValue } = form;

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
          onClick={() =>
            this.setState({
              openConvenienceStoreMap: true,
              scrollY: window.scrollY,
            })
          }
        >
          {SHIPMENT_STORE_FIELDS.map(field => getFieldValue(field)).some(
            value => value,
          )
            ? t('rechoose-store')
            : t('choose-store')}
        </Button>

        {SHIPMENT_STORE_FIELDS.map(field =>
          !getFieldValue(field) ? null : (
            <div
              key={getFieldValue(field)}
              className={styles.convenienceStoreInfo}
            >
              {t(`convenience-store.${field}`)}：{getFieldValue(field)}
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
                  message: index !== 0 ? ' ' : t('not-choose-store'),
                },
              ],
            })(<Input type="hidden" />)}
          </FormItem>
        ))}

        {CONVENIENCE_STORE_FIELDS.map(fieldName => (
          <FormItem key={fieldName} className={styles.hideFormItem}>
            {getFieldDecorator(fieldName)(<Input type="hidden" />)}
          </FormItem>
        ))}

        {!openConvenienceStoreMap ? null : (
          <ConvenienceStoreMap
            shipmentType={
              shipmentTemplate === 'allpay'
                ? ECPAY_SHIPMENT_TYPE_ENUM(allpay.logisticsSubType)
                : 'EZSHIP'
            }
            storeTypes={
              shipmentTemplate === 'allpay'
                ? ECPAY_CONVENIENCE_STORE_TYPE_ENUM(allpay.logisticsSubType)
                : EZSHIP_CONVENIENCE_STORE_TYPE_ENUM
            }
            close={this.closeConvenienceStoreMap}
            confirmStore={this.confirmStore}
          />
        )}
      </>
    );
  }
}
