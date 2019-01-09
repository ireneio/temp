import React from 'react';
import PropTypes from 'prop-types';
import radium, { Style, StyleRoot } from 'radium';
import { Table, Input, Select, Button, message } from 'antd';
import moment from 'moment';

import { enhancer } from 'layout/DecoratorsRoot';
import Thumb from 'thumb';
import { ID_TYPE, COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles';
import * as LOCALE from './locale';

@enhancer
@radium
export default class MemberOrderApply extends React.PureComponent {
  name = 'member-order-apply';

  static propTypes = {
    type: PropTypes.oneOf(['return', 'replace']).isRequired,
    orderDetails: PropTypes.shape({
      id: ID_TYPE.isRequired,
      categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      orderNo: PropTypes.string.isRequired,
      createdOn: PropTypes.number.isRequired,
      paymentInfo: PropTypes.shape({}).isRequired,
      shipmentInfo: PropTypes.shape({}).isRequired,
      status: PropTypes.number.isRequired,
    }).isRequired,
    orderApply: PropTypes.arrayOf(PropTypes.shape({})).isRequired, // eslint-disable-line react/no-unused-prop-types

    /** props from DecoratorsRoot */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    goTo: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      orderDetails: { id, categories, shipmentInfo },
      orderApply,
    } = nextProps;

    if (id === prevState.id) return null;

    const orderApplyProducts = categories[0].products
      .map(product => {
        const productApplyData = orderApply.find(
          apply => apply.orderProductId === product.id,
        );
        if (productApplyData) {
          const { status: applyStatus } = productApplyData;
          if (applyStatus === 0 || applyStatus === 3) {
            return {
              ...product,
              quantity: 0,
            };
          }
          return {
            ...product,
            quantity: product.quantity - productApplyData.quantity,
          };
        }
        return product;
      })
      .filter(i => i.quantity && i.type !== 'gift');

    return {
      id,
      step: 0,
      select: [],
      products: orderApplyProducts,
      name: shipmentInfo.list[0].recipient.name,
      mobile: shipmentInfo.list[0].recipient.mobile,
      address: shipmentInfo.list[0].recipient.address?.streetAddress,
    };
  }

  handleSelectChange = select => {
    this.setState({ select });
  };

  handleDataChange = e => {
    const { name, value, dataset } = e.target;

    switch (name) {
      case 'reason':
      case 'quantitySelected':
        this.setState(prevState => ({
          products: prevState.products.map(product => {
            if (product.id === dataset.id) {
              return {
                ...product,
                [name]: value,
              };
            }
            return product;
          }),
        }));
        break;
      case 'name':
      case 'mobile':
      case 'address':
        this.setState({ [name]: value });
        break;
      default:
        break;
    }
  };

  handleStepRecede = () => {
    const { goTo } = this.props;
    const { step } = this.state;

    if (step) {
      this.setState({ step: 0 });
    } else {
      goTo({ pathname: '/orders' });
    }
  };

  handleStepProceed = () => {
    const { step } = this.state;
    const { type, transformLocale } = this.props;

    if (step && this.validateApply()) {
      this.creatApply();
    } else if (!step && this.validateApply()) {
      this.setState({ step: 1 });
    } else {
      message.info(transformLocale(LOCALE.WARNING(type)));
    }
  };

  validateApply = () => {
    const { type } = this.props;
    const { select, name, mobile, address } = this.state;

    if (type === 'replace') return select.length && name && mobile && address;
    return select.length;
  };

  creatApply = () => {
    const { select, products, name, mobile, address } = this.state;
    const { type, orderDetails, dispatchAction } = this.props;

    const { address: oldAddress } = orderDetails.shipmentInfo.list[0].recipient;

    const orderProducts = products
      .filter(product => select.indexOf(product.id) > -1)
      .map(product => ({
        applicationInfo: {
          comment: product.reason || '',
        },
        id: product.id,
        quantity: product.quantitySelected || product.quantity,
      }));

    dispatchAction('createApply', {
      applicationType: type,
      orderId: orderDetails.id,
      orderProducts,
      recipient: {
        ...orderDetails.shipmentInfo.list[0].recipient,
        address: {
          ...oldAddress,
          streetAddress: address,
        },
        name,
        mobile,
      },
    });
  };

  generateColumns = () => {
    const { type, transformLocale, transformCurrency } = this.props;
    const { step } = this.state;

    return [
      {
        dataIndex: 'galleryInfo',
        render: (value, record) => (
          <StyleRoot style={styles.imgWrapper}>
            <Thumb imgUrl={`//${value.mainId || value.media[0]}`} />,
            <div className="show-on-mobile" style={styles.reason(step)}>
              {this.renderReason(record.reason, record)}
            </div>
          </StyleRoot>
        ),
      },
      {
        title: transformLocale(LOCALE.PRODUCT_TITLE),
        dataIndex: 'title',
        width: '50%',
        render: (value, record) => (
          <>
            <div>{transformLocale(value)}</div>
            <div className="show-on-mobile">
              {this.renderSpecs(record.specs)}
            </div>
            <div className="show-on-mobile">
              {transformCurrency(record.retailPrice)}
            </div>
          </>
        ),
      },
      {
        title: transformLocale(LOCALE.PRODUCT_SPEC),
        dataIndex: 'specs',
        width: '50%',
        className: 'hide-on-mobile',
        render: this.renderSpecs,
      },
      {
        title: transformLocale(LOCALE.PRODUCT_QUANTITY),
        className: 'not-break',
        align: 'center',
        dataIndex: 'quantitySelected',
        render: this.renderQuantity,
      },
      {
        title: transformLocale(LOCALE.PRODUCT_PRICE),
        dataIndex: 'retailPrice',
        className: 'hide-on-mobile not-break',
        align: 'right',
        render: transformCurrency,
      },
      {
        title: transformLocale(LOCALE.PRODUCT_SUBTOTAL),
        dataIndex: 'retailPrice',
        className: 'not-break',
        align: 'right',
        key: 'subTotal',
        render: (value, record) =>
          transformCurrency(
            value * (record.quantitySelected || record.quantity),
          ),
      },
      {
        title: transformLocale(LOCALE.REASON(type)),
        dataIndex: 'reason',
        className: 'hide-on-mobile',
        width: '10%',
        render: this.renderReason,
      },
    ];
  };

  renderSpecs = value => {
    if (!value) return null;

    const { transformLocale } = this.props;

    return value.reduce(
      (prev, curr, index) =>
        `${prev}${index ? '／' : ''}${transformLocale(curr.title)}`,
      '',
    );
  };

  renderQuantity = (value, record) => {
    const { step } = this.state;

    if (step) return value || record.quantity;

    const options = [];
    for (let index = 1; index <= record.quantity; index += 1) {
      options.push(
        <Select.Option key={index} value={index}>
          {index}
        </Select.Option>,
      );
    }
    return (
      <Select
        defaultValue={value || record.quantity}
        onChange={e => {
          this.handleDataChange({
            target: {
              name: 'quantitySelected',
              dataset: {
                id: record.id,
              },
              value: e,
            },
          });
        }}
      >
        {options}
      </Select>
    );
  };

  renderReason = (value, record, index) => {
    const { step } = this.state;

    if (step) {
      return (
        <div style={index !== undefined ? { width: '360px' } : {}}>
          {value || ''}
        </div>
      );
    }

    const { type, transformLocale } = this.props;

    return (
      <Input
        data-id={record.id}
        name="reason"
        placeholder={transformLocale(LOCALE.REASON(type, true))}
        style={index !== undefined ? { width: '360px' } : {}}
        onChange={this.handleDataChange}
        value={value || ''}
      />
    );
  };

  render() {
    const { type, orderDetails, colors, transformLocale } = this.props;
    const { step, select, products, name, mobile, address } = this.state;
    const { handleDataChange, handleStepRecede, handleStepProceed } = this;
    const { orderNo, createdOn } = orderDetails;
    const rowSelection = {
      selectedRowKeys: select,
      onChange: this.handleSelectChange,
    };

    return (
      <div style={styles.root(colors)} className={this.name}>
        <Style scopeSelector={`.${this.name}`} rules={styles.Style(colors)} />
        <StyleRoot style={styles.wrapper}>
          <div style={styles.subtitle}>
            <span>{transformLocale(LOCALE.ORDER_NO) + orderNo}</span>
            <span>
              <span className="hide-on-mobile">
                {transformLocale(LOCALE.CREATED_ON)}
              </span>
              <span className="fade-on-mobile">
                {moment.unix(createdOn).format('YYYY/MM/DD')}
              </span>
            </span>
          </div>
          {!step ? (
            <>
              <div style={styles.table}>
                <Table
                  rowKey="id"
                  rowSelection={rowSelection}
                  columns={this.generateColumns()}
                  dataSource={products}
                  pagination={false}
                  size="middle"
                />
              </div>
              {type === 'replace' && (
                <div style={styles.form}>
                  <h1 style={styles.formTitle}>
                    {transformLocale(LOCALE.RECIPIENT)}
                  </h1>
                  <Input
                    size="large"
                    name="name"
                    placeholder={transformLocale(LOCALE.RECIPIENT_NAME)}
                    style={styles.input}
                    value={name}
                    onChange={handleDataChange}
                  />
                  <Input
                    size="large"
                    name="mobile"
                    placeholder={transformLocale(LOCALE.RECIPIENT_MOBILE)}
                    style={styles.input}
                    value={mobile}
                    onChange={handleDataChange}
                  />
                  <Input
                    size="large"
                    name="address"
                    placeholder={transformLocale(LOCALE.RECIPIENT_ADDRESS)}
                    style={styles.input}
                    value={address}
                    onChange={handleDataChange}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {type === 'replace' && (
                <div style={styles.comfirm}>
                  <p>
                    {transformLocale(LOCALE.RECIPIENT_NAME)}：{name}
                  </p>
                  <p>
                    {transformLocale(LOCALE.RECIPIENT_MOBILE)}：{mobile}
                  </p>
                  <p>
                    {transformLocale(LOCALE.RECIPIENT_ADDRESS)}：{address}
                  </p>
                </div>
              )}
              <div style={styles.table}>
                <Table
                  rowKey="id"
                  columns={this.generateColumns()}
                  dataSource={products.filter(
                    product => select.indexOf(product.id) > -1,
                  )}
                  pagination={false}
                  size="middle"
                />
              </div>
            </>
          )}
          <div style={styles.panel}>
            <Button
              size="large"
              style={styles.button(colors)}
              onClick={handleStepRecede}
            >
              {transformLocale(LOCALE.RECEDE)}
            </Button>
            <Button
              size="large"
              style={styles.button(colors)}
              onClick={handleStepProceed}
            >
              {transformLocale(LOCALE.PROCEED(step))}
            </Button>
          </div>
        </StyleRoot>
      </div>
    );
  }
}
