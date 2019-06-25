import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Table } from 'antd';
import memoizeOne from 'memoize-one';
import transformColor from 'color';

import { contextProvider } from 'context';
import { ThumbPlaceholder } from 'placeholder';
import Thumb from 'thumb';
import localeFragment from 'fragments/localeFragment';

import * as LOCALE from './locale';
import styles from './styles/products.less';

const { enhancer } = contextProvider(['locale', 'currency', 'storeSetting']);

export const productsFragment = gql`
  fragment memberOrder_productsFragment on productsObjectType {
    id
    coverImage {
      src
    }
    title {
      ...localeFragment
    }
    type
    specs {
      title {
        ...localeFragment
      }
    }
    stock
    quantity
    retailPrice
  }
  ${localeFragment}
`;

@enhancer
export default class Products extends React.PureComponent {
  static propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  };

  columns = memoizeOne(() => {
    const { transformLocale, transformCurrency } = this.props;

    return [
      {
        dataIndex: 'coverImage.src',
        render: value =>
          !value ? <ThumbPlaceholder /> : <Thumb imgUrl={value} />,
      },
      {
        title: transformLocale(LOCALE.PRODUCT_TITLE),
        dataIndex: 'title',
        render: (value, { specs, type, stock, quantity }) => (
          <>
            {transformLocale(value)}

            <div>
              {specs?.map(({ title }) => transformLocale(title)).join(' / ')}
            </div>

            <div>
              {`${transformLocale(LOCALE.PRODUCT_QUANTITY)}：${
                type === 'gift' && !stock ? 0 : quantity
              }`}
            </div>
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
        dataIndex: 'quantity',
        render: (value, { type, stock }) =>
          type === 'gift' && !stock ? 0 : value,
        align: 'center',
      },
      {
        title: transformLocale(LOCALE.PRODUCT_PRICE),
        dataIndex: 'retailPrice',
        render: (value, { type }) =>
          type === 'gift'
            ? transformLocale(LOCALE.GIFT)
            : transformCurrency(value),
        align: 'right',
      },
      {
        title: transformLocale(LOCALE.PRODUCT_SUBTOTAL),
        dataIndex: 'retailPrice',
        render: (value, { type, stock, quantity }) =>
          type === 'gift'
            ? transformLocale(stock ? LOCALE.GIFT : LOCALE.NO_GIFT)
            : transformCurrency(value * quantity),
        align: 'right',
        key: 'subTotal',
      },
    ];
  });

  render() {
    const {
      /** context */
      storeSetting: { colors },

      /** props */
      products,
    } = this.props;

    return (
      <>
        <Table
          className={styles.root}
          dataSource={products}
          columns={this.columns()}
          rowKey="id"
          pagination={false}
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} .ant-table-tbody > tr:hover > td {
                background: ${transformColor(colors[4]).alpha(0.1)};
              }
            `,
          }}
        />
      </>
    );
  }
}
