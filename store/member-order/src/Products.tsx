// typescript import
import { ColumnProps } from 'antd/lib/table';
import { I18nPropsType } from '@store/utils/lib/i18n';
import { CurrencyType } from '@store/currency';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Table } from 'antd';
import memoizeOne from 'memoize-one';
import transformColor from 'color';
import idx from 'idx';

import Thumbnail from '@store/thumbnail';
import { withNamespaces } from '@store/utils/lib/i18n';
import withCurrency from '@store/currency';

import styles from './styles/products.less';

// graphql typescript
import {
  productsFragment as productsFragmentType,
  productsFragment_coverImage as productsFragmentCoverImage,
} from './__generated__/productsFragment';
import {
  getMemberOrder_viewer_order as getMemberOrderViewerOrder,
  getMemberOrder_getColorList as getMemberOrderGetColorList,
} from './__generated__/getMemberOrder';

// graphql import
import localeFragment from '@store/utils/lib/fragments/locale';

// typescript definition
interface PropsType extends I18nPropsType, CurrencyType {
  products: getMemberOrderViewerOrder['products'];
  colors: getMemberOrderGetColorList['colors'];
}

// definition
export const productsFragment = gql`
  fragment productsFragment on productsObjectType {
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

class Products extends React.PureComponent<PropsType> {
  private generateColumns: ({
    t,
    c,
  }: Pick<PropsType, 't' | 'c'>) => ColumnProps<
    productsFragmentType
  >[] = memoizeOne(({ t, c }) => {
    const {
      i18n: { language },
    } = this.props;

    return [
      {
        dataIndex: 'coverImage.src',
        render: (value: productsFragmentCoverImage['src']) => (
          <Thumbnail imgUrl={value} />
        ),
      },
      {
        title: t('product.title'),
        dataIndex: 'title',
        render: (
          value: productsFragmentType['title'],
          { specs, type, stock, quantity }: productsFragmentType,
        ) => (
          <>
            {!value ? null : value[language] || value.zh_TW}

            <div>
              {(specs || [])
                .map(
                  spec =>
                    idx(spec, _ => _.title[language]) ||
                    idx(spec, _ => _.title.zh_TW),
                )
                .filter(spec => spec)
                .join(' / ')}
            </div>

            <div>
              {`${t('product.quantity')}：${
                type === 'gift' && !stock ? 0 : quantity
              }`}
            </div>
          </>
        ),
        width: '50%',
      },
      {
        title: t('product.spec'),
        dataIndex: 'specs',
        render: (value: productsFragmentType['specs']) =>
          (value || [])
            .map(
              spec =>
                idx(spec, _ => _.title[language]) ||
                idx(spec, _ => _.title.zh_TW),
            )
            .filter(spec => spec)
            .join(' / '),
        width: '50%',
      },
      {
        title: t('product.quantity'),
        dataIndex: 'quantity',
        render: (
          value: productsFragmentType['quantity'],
          { type, stock }: productsFragmentType,
        ) => (type === 'gift' && !stock ? 0 : value),
        align: 'center',
      },
      {
        title: t('product.price'),
        dataIndex: 'retailPrice',
        render: (
          value: productsFragmentType['retailPrice'],
          { type }: productsFragmentType,
        ) => (type === 'gift' ? t('product.gift') : c(value || 0)),
        align: 'right',
      },
      {
        title: t('product.subtotal'),
        dataIndex: 'retailPrice',
        render: (
          value: productsFragmentType['retailPrice'],
          { type, stock, quantity }: productsFragmentType,
        ) =>
          type === 'gift'
            ? t(stock ? 'product.gift' : 'product.no-gift')
            : c((value || 0) * (quantity || 1)),
        align: 'right',
        key: 'subTotal',
      },
    ];
  });

  public render(): React.ReactNode {
    const { t, c, colors, products } = this.props;
    // TODO: should not be null[]
    const filteredProducts = products.filter(
      product => product,
    ) as productsFragmentType[];

    return (
      <>
        <Table<productsFragmentType>
          className={styles.root}
          dataSource={filteredProducts}
          columns={this.generateColumns({ t, c })}
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

const EnhancedProducts = withNamespaces('member-order')(withCurrency(Products));

export default EnhancedProducts;
