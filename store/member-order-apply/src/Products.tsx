// typescript import
import { ColumnProps } from 'antd/lib/table';

import { I18nPropsType } from '@store/utils/lib/i18n';
import { CurrencyType } from '@store/currency';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Table, Input, Select } from 'antd';
import memoizeOne from 'memoize-one';
import transformColor from 'color';
import idx from 'idx';

import Thumbnail from '@store/thumbnail';
import localeFragment from '@store/utils/lib/fragments/locale';
import { withNamespaces } from '@store/utils/lib/i18n';
import withCurrency from '@store/currency';

import styles from './styles/products.less';

// graphql typescript
import { getMemberOrderApply_getColorList as getMemberOrderApplyGetColorList } from './__generated__/getMemberOrderApply';

// graphql import
import {
  productsProductsObjectTypeFragment as productsProductsObjectTypeFragmentType,
  productsProductsObjectTypeFragment_coverImage as productsProductsObjectTypeFragmentCoverImage,
} from './__generated__/productsProductsObjectTypeFragment';

// typescript definition
interface PropsType extends I18nPropsType, CurrencyType {
  selectedProducts: SelectedProduct[];
  products: (productsProductsObjectTypeFragmentType | null)[];
  type: 'refund' | 'exchange';
  checking: boolean;
  onChange: (newProducts: SelectedProduct[]) => void;
}

interface StateType {
  availableProducts: SelectedProduct[];
  selectedRowKeys: string[];
}

export interface SelectedProduct
  extends productsProductsObjectTypeFragmentType {
  quantitySelected: number;
  reason: string;
}

// definition
export const productsOrderApplyFragment = gql`
  fragment productsOrderApplyFragment on OrderApply {
    id
    orderId
    orderProductId
    returnId
    applicationType
    createdOn
    recipient {
      name
      mobile
      address {
        streetAddress
      }
    }
    applicationInfo {
      comment
    }
    quantity
    status
    applicationStatus
  }
`;

export const productsProductsObjectTypeFragment = gql`
  fragment productsProductsObjectTypeFragment on productsObjectType {
    id
    quantity
    type
    coverImage {
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
    unappliedQuantity @client
  }

  ${localeFragment}
`;

class Products extends React.PureComponent<PropsType, StateType> {
  // eslint-disable-next-line react/sort-comp
  private availableProducts = () => {
    const { products } = this.props;

    // exclude gifts
    const filteredProducts = products.filter(
      product => product && product.type !== 'gift',
    ) as productsProductsObjectTypeFragmentType[];

    return filteredProducts.reduce(
      (result, { unappliedQuantity, ...product }) => {
        if (unappliedQuantity <= 0) return result;

        result.push({
          ...product,
          unappliedQuantity,
          quantity: unappliedQuantity,
          quantitySelected: unappliedQuantity,
          reason: '',
        });

        return result;
      },
      [] as SelectedProduct[],
    );
  };

  public state: StateType = {
    availableProducts: this.availableProducts(),
    selectedRowKeys: [],
  };

  private columns: (
    checking: PropsType['checking'],
    i18n: PropsType['i18n'],
    t: PropsType['t'],
    c: PropsType['c'],
  ) => ColumnProps<SelectedProduct>[] = memoizeOne((checking, i18n, t, c) => {
    const { language } = i18n;

    return [
      {
        dataIndex: 'coverImage.src',
        render: (
          value: productsProductsObjectTypeFragmentCoverImage['src'],
        ) => <Thumbnail imgUrl={value} />,
      },
      {
        title: t('product.title'),
        dataIndex: 'title',
        render: (
          value: SelectedProduct['title'],
          { specs, retailPrice }: SelectedProduct,
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

            <div>{c(retailPrice || 0)}</div>
          </>
        ),
        width: '50%',
      },
      {
        title: t('product.spec'),
        dataIndex: 'specs',
        render: (value: SelectedProduct['specs']) =>
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
        dataIndex: 'quantitySelected',
        render: (
          value: SelectedProduct['quantity'],
          { id, quantity }: SelectedProduct,
        ) => {
          if (checking) return value;

          return (
            <Select
              defaultValue={value || 0}
              onChange={(quantitySelected: number) =>
                this.handleValueChange(id, 'quantitySelected', quantitySelected)
              }
            >
              {new Array(quantity).fill(null).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Select.Option key={index} value={index + 1}>
                  {index + 1}
                </Select.Option>
              ))}
            </Select>
          );
        },
        align: 'center',
      },
      {
        title: t('product.price'),
        dataIndex: 'retailPrice',
        render: (value: SelectedProduct['retailPrice']) => c(value || 0),
        align: 'right',
      },
      {
        title: t('product.subtotal'),
        dataIndex: 'retailPrice',
        render: (
          value: SelectedProduct['retailPrice'],
          { quantitySelected }: SelectedProduct,
        ) => c((value || 0) * quantitySelected),
        align: 'right',
        key: 'subTotal',
      },
      {
        title: t('reason'),
        dataIndex: 'reason',
        render: this.renderReason,
        width: '10%',
      },
    ];
  });

  private renderReason = (
    value: SelectedProduct['reason'],
    { id }: Partial<SelectedProduct>,
  ) => {
    const {
      /** HOC */
      t,

      /** props */
      checking,
    } = this.props;

    if (checking) return <div className={styles.reason}>{value}</div>;

    return (
      <Input
        className={styles.reason}
        placeholder={t('reason')}
        value={value}
        onChange={({ target: { value: reason } }) =>
          this.handleValueChange(id || 'null id', 'reason', reason)
        }
      />
    );
  };

  private handleValueChange = (
    productId: SelectedProduct['id'],
    name: keyof SelectedProduct,
    value: string | number,
  ) => {
    const { onChange } = this.props;
    const { availableProducts, selectedRowKeys } = this.state;
    const newAvailableProducts = [...availableProducts];
    const product = newAvailableProducts.find(
      ({ id: availableProductId }) => availableProductId === productId,
    );

    if (product) (product[name] as string | number) = value;

    onChange(
      newAvailableProducts.filter(({ id: availableProductId }) =>
        selectedRowKeys.includes(availableProductId || ''),
      ),
    );

    this.setState({ availableProducts: newAvailableProducts });
  };

  public render(): React.ReactNode {
    const { i18n, t, c, checking, onChange, selectedProducts } = this.props;
    const { availableProducts, selectedRowKeys } = this.state;

    return (
      <Table<SelectedProduct>
        className={`${styles.root} ${checking ? styles.checking : ''}`}
        columns={this.columns(checking, i18n, t, c)}
        dataSource={!checking ? availableProducts : selectedProducts}
        expandedRowRender={({ reason, ...data }) =>
          this.renderReason(reason, data)
        }
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys: string[], newProducts) =>
            this.setState({ selectedRowKeys: newSelectedRowKeys }, () =>
              onChange(newProducts),
            ),
        }}
        pagination={false}
        rowKey="id"
        defaultExpandAllRows
      />
    );
  }
}

export const getProductsStyles = (
  colors: getMemberOrderApplyGetColorList['colors'],
): string => `
  .${styles.root} .ant-table-tbody > tr:hover > td {
    background: ${transformColor(colors[4]).alpha(0.1)};
  }

  .${styles.root} .ant-table-tbody > tr.ant-table-row-selected td: {
    background: ${transformColor(colors[4]).alpha(0.1)};
  }
`;

export default withNamespaces('member-order-apply')(withCurrency(Products));
