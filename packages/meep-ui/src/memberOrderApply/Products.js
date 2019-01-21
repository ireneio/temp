import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Table, Input, Select } from 'antd';
import memoizeOne from 'memoize-one';
import transformColor from 'color';

import { contextProvider } from 'context';
import Thumb from 'thumb';
import localeFragment from 'fragments/localeFragment';

import styles from './styles/products.less';
import * as LOCALE from './locale';

const { enhancer } = contextProvider(['locale', 'currency', 'storeSetting']);
const { Option } = Select;

export const productsFragment = gql`
  fragment memberOrderApply_productsFragment on Order {
    id
    products {
      id
      quantity
      type
      mainImage {
        src
      }
      title {
        ...localeFragment
      }
      specs {
        title {
          ...localeFragment
        }
      }
      quantity
      retailPrice
    }
  }
  ${localeFragment}
`;

export const productsOrderApplyListFragment = gql`
  fragment productsOrderApplyListFragment on OrderApply {
    orderId
    orderProductId
    status
    quantity
  }
`;

@enhancer
export default class Products extends React.PureComponent {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
    order: PropTypes.shape({}).isRequired,
    type: PropTypes.oneOf(['orderRefund', 'orderExchange']).isRequired,
    checking: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    products: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      order: { id, products },
      orderApplyList,
    } = nextProps;

    if (id === prevState.id) return null;

    const orderApply = orderApplyList.filter(({ orderId }) => orderId === id);

    // TODO: should add in schemas
    return {
      id,
      orderApplyProducts: products.reduce(
        (result, { id: productId, quantity, type, ...product }) => {
          if (type === 'gift') return result;

          const orderApplyProducts = orderApply.find(
            ({ orderProductId }) => orderProductId === productId,
          );

          if (orderApplyProducts && [0, 3].includes(orderApplyProducts.status))
            return result;

          const newQuantity = quantity - (orderApplyProducts?.quantity || 0);

          if (newQuantity === 0) return result;

          result.push({
            ...product,
            id: productId,
            quantity: newQuantity,
            quantitySelected: newQuantity,
            reason: '',
          });

          return result;
        },
        [],
      ),
    };
  }

  columns = memoizeOne(checking => {
    const {
      /** context */
      transformLocale,
      transformCurrency,

      /** props */
      type,
    } = this.props;

    return [
      {
        dataIndex: 'mainImage.src',
        render: value => (!value ? null : <Thumb imgUrl={value} />),
      },
      {
        title: transformLocale(LOCALE.PRODUCT_TITLE),
        dataIndex: 'title',
        render: (value, { specs, retailPrice }) => (
          <>
            {transformLocale(value)}

            <div>
              {specs?.map(({ title }) => transformLocale(title)).join(' / ')}
            </div>

            <div>{transformCurrency(retailPrice)}</div>
          </>
        ),
        width: '50%',
      },
      {
        title: transformLocale(LOCALE.PRODUCT_SPEC),
        dataIndex: 'specs',
        render: value =>
          value?.map(({ title }) => transformLocale(title)).join(' / '),
        width: '50%',
      },
      {
        title: transformLocale(LOCALE.PRODUCT_QUANTITY),
        dataIndex: 'quantitySelected',
        render: (value, { id, quantity }) => {
          if (checking) return value;

          return (
            <Select
              defaultValue={value}
              onChange={({ target: { value: quantitySelected } }) =>
                this.handleValueChange(id, 'quantitySelected', quantitySelected)
              }
            >
              {[].constructor.apply({}, new Array(quantity)).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Option key={index} value={index}>
                  {index + 1}
                </Option>
              ))}
            </Select>
          );
        },
        align: 'center',
      },
      {
        title: transformLocale(LOCALE.PRODUCT_PRICE),
        dataIndex: 'retailPrice',
        render: value => transformCurrency(value),
        align: 'right',
      },
      {
        title: transformLocale(LOCALE.PRODUCT_SUBTOTAL),
        dataIndex: 'retailPrice',
        render: (value, { quantitySelected }) =>
          transformCurrency(value * quantitySelected),
        align: 'right',
        key: 'subTotal',
      },
      {
        title: transformLocale(LOCALE.REASON(type)),
        dataIndex: 'reason',
        render: this.renderReason,
        width: '10%',
      },
    ];
  });

  state = {
    id: null,
    orderApplyProducts: [],
    selectedRowKeys: [],
  };

  renderReason = (value, { id }) => {
    const {
      /** context */
      transformLocale,

      /** props */
      type,
      checking,
    } = this.props;

    if (checking) return <div className={styles.reason}>{value}</div>;

    return (
      <Input
        className={styles.reason}
        placeholder={`${transformLocale(LOCALE.INPUT)}${transformLocale(
          LOCALE.REASON(type),
        )}`}
        value={value}
        onChange={({ target: { value: reason } }) =>
          this.handleValueChange(id, 'reason', reason)
        }
      />
    );
  };

  handleValueChange = (id, name, value) => {
    const { onChange } = this.props;
    const { orderApplyProducts, selectedRowKeys } = this.state;
    const newOrderApplyProducts = [...orderApplyProducts];

    newOrderApplyProducts.find(
      ({ id: orderApplyProductId }) => orderApplyProductId === id,
    )[name] = value;
    onChange(
      newOrderApplyProducts.filter(({ id: orderApplyProductId }) =>
        selectedRowKeys.includes(orderApplyProductId),
      ),
    );

    this.setState({ orderApplyProducts: newOrderApplyProducts });
  };

  render() {
    const {
      /** context */
      storeSetting: { colors },

      /** props */
      checking,
      onChange,
      products,
    } = this.props;
    const { orderApplyProducts, selectedRowKeys } = this.state;

    return (
      <>
        <Table
          className={`${styles.root} ${checking ? styles.checking : ''}`}
          columns={this.columns(checking)}
          dataSource={!checking ? orderApplyProducts : products}
          expandedRowRender={({ reason, ...data }) =>
            this.renderReason(reason, data)
          }
          rowSelection={{
            selectedRowKeys,
            onChange: (newSelectedRowKeys, newProducts) =>
              this.setState({ selectedRowKeys: newSelectedRowKeys }, () =>
                onChange(newProducts),
              ),
          }}
          pagination={false}
          rowKey="id"
          defaultExpandAllRows
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} .ant-table-tbody > tr:hover > td {
                background: ${transformColor(colors[4]).alpha(0.1)};
              }

              .${styles.root} .ant-table-tbody > tr.ant-table-row-selected td: {
                background: ${transformColor(colors[4]).alpha(0.1)};
              }
            `,
          }}
        />
      </>
    );
  }
}
