// typescript import
import { ColumnProps } from 'antd/lib/table';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { ColorsType, CurrencyType } from '@meepshop/context';

// import
import React from 'react';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Table } from 'antd';
import memoizeOne from 'memoize-one';
import transformColor from 'color';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import {
  Colors as ColorsContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import Thumbnail from '@meepshop/thumbnail';
import withContext from '@store/utils/lib/withContext';

import styles from './styles/products.less';

// graphql typescript
import {
  productsFragment as productsFragmentType,
  getMemberOrder_viewer_order as getMemberOrderViewerOrder,
} from '@meepshop/types/gqls/store';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';
import { thumbnailFragment } from '@meepshop/thumbnail/gqls';

// typescript definition
interface PropsType extends I18nPropsType, CurrencyType {
  products: getMemberOrderViewerOrder['products'];
  colors: ColorsType;
}

// definition
export const productsFragment = gql`
  fragment productsFragment on productsObjectType {
    id
    coverImage {
      ...thumbnailFragment
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
  ${thumbnailFragment}
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
        dataIndex: 'coverImage',
        render: (value: productsFragmentType['coverImage']) => (
          <Thumbnail image={filter(thumbnailFragment, value || null)} />
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
                .map(spec => spec?.title?.[language] || spec?.title?.zh_TW)
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
            .map(spec => spec?.title?.[language] || spec?.title?.zh_TW)
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
    // SHOULD_NOT_BE_NULL
    const filteredProducts = products.filter(Boolean) as productsFragmentType[];

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

const EnhancedProducts = withTranslation('member-order')(
  withContext(CurrencyContext)(
    withContext(ColorsContext, colors => ({ colors }))(Products),
  ),
);

export default EnhancedProducts;
