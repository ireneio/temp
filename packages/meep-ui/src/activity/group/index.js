import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useQuery } from '@apollo/client';

import withHook from '@store/utils/lib/withHook';
import { withTranslation } from '@meepshop/locales';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, COLOR_TYPE, LOCALE_TYPE } from 'constants/propTypes';

import Product from './Product';
import Pagination from './Pagination';
import SortIcon from './SortIcon';
import { getProductsInActivity } from './gqls';
import * as styles from './styles';

@withTranslation('activity')
@withHook(({ group }) =>
  useQuery(getProductsInActivity, {
    variables: {
      search: {
        size: 20,
        from: 0,
        filter: {
          and: [
            {
              type: 'exact',
              field: 'status',
              query: '1',
            },
            {
              type: 'ids',
              ids: group.products.map(product => product.productId),
            },
          ],
          or: [],
        },
        sort: [
          {
            field: 'variantInfo.minRetailPrice',
            order: 'asc',
          },
        ],
        showMainFile: true,
      },
    },
  }),
)
@enhancer
@radium
export default class Group extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    t: PropTypes.func.isRequired,
    background: PropTypes.string.isRequired,
    group: PropTypes.shape({
      title: LOCALE_TYPE.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          productId: ID_TYPE.isRequired,
        }).isRequired,
      ),
    }).isRequired,
  };

  scrollToTop = () => {
    this.node.scrollIntoView();
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      i18n,
      background,
      group,
      data,
      variables,
      refetch,
    } = this.props;

    if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

    const products = data.computeProductList.data || null;
    const total = data.computeProductList.total || 0;
    const sort = variables.search.sort[0].order;
    const limit = variables.search.size;

    return (
      <div
        style={styles.root}
        ref={node => {
          this.node = node;
        }}
      >
        <StyleRoot>
          <div
            style={[
              styles.header,
              {
                borderLeft: `5px solid ${colors[4]}`,
              },
            ]}
          >
            {group.title[i18n.language] || group.title.zh_TW}

            <SortIcon
              sort={sort}
              style={styles.sort}
              onClick={() =>
                refetch({
                  ...variables,
                  search: {
                    ...variables.search,
                    sort: [
                      {
                        ...variables.search.sort[0],
                        order: sort === 'asc' ? 'desc' : 'asc',
                      },
                    ],
                  },
                })
              }
            />
          </div>
          <div
            style={[
              styles.products(background),
              !products && styles.flexCenter,
            ]}
          >
            {products ? (
              products.map(({ id, ...product }) => (
                <Product
                  key={id}
                  product={{
                    id,
                    ...product,
                  }}
                />
              ))
            ) : (
              <Spin
                indicator={
                  <LoadingOutlined style={styles.loading(colors)} spin />
                }
              />
            )}
          </div>
          {total && total > limit && (
            <Pagination
              total={total}
              variables={variables}
              refetch={refetch}
              scrollToTop={this.scrollToTop}
            />
          )}
        </StyleRoot>
      </div>
    );
  }
}
