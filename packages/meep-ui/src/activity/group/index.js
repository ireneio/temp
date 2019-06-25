import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { enhancer } from 'layout/DecoratorsRoot';

import { ID_TYPE, COLOR_TYPE, LOCALE_TYPE } from 'constants/propTypes';

import { Spin, Icon } from 'antd';

import Product from './Product';
import Pagination from './Pagination';
import SortIcon from './SortIcon';

import * as styles from './styles';

@enhancer
@radium
export default class Group extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    getData: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    background: PropTypes.string.isRequired,
    group: PropTypes.shape({
      title: LOCALE_TYPE.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          productId: ID_TYPE.isRequired,
        }).isRequired,
      ),
    }).isRequired,
    cart: PropTypes.shape({}),
    wishList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    stockNotificationList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  static defaultProps = {
    cart: null,
  };

  state = {
    params: {
      ids: [],
      limit: 20,
      offset: 0,
      sort: 'asc',
    },
    products: null,
    total: 0,
  };

  componentDidMount() {
    const { group } = this.props;
    const { params } = this.state;

    const ids = group.products.map(product => product.productId);

    this.getProductsData({ ...params, ids });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  getProductsData = async params => {
    this.setState({
      params,
      products: null,
    });

    const { ids, limit, offset, sort } = params;

    const variables = {
      search: {
        size: limit,
        from: offset,
        filter: {
          and: [
            {
              type: 'exact',
              field: 'status',
              query: 1,
            },
            {
              type: 'ids',
              ids,
            },
          ],
          or: [],
        },
        sort: [
          {
            field: 'variantInfo.minRetailPrice',
            order: sort,
          },
        ],
        showMainFile: true,
      },
    };

    // TODO rewrite query
    const productQuery = `
      data {
        id
        status
        title{
          zh_TW
          en_US
        }
        coverImage {
          fileId
          src
        }
        galleries {
          images {
            fileId
            isMain
            src
          }
        }
        variants {
          id
          specs {
            id
            specId
            title{
              zh_TW
              en_US
            }
          }
          stock
          maxPurchaseLimit
          minPurchaseItems
          totalPrice
        }
        specs {
          id
          title {
            zh_TW
            en_US
          }
        }
      }
      total
    `;

    const query = `
      query computeProduct4Activity($search: searchInputObjectType) {
        computeProductList(search: $search) {
          ${productQuery}
        }
      }
    `;

    const { getData } = this.props;
    const result = await getData(query, variables);

    if (this.isUnmounted || !result?.data?.computeProductList) return;

    const { data: products, total } = result.data.computeProductList;

    this.setState({ products, total });
  };

  scrollToTop = () => {
    this.node.scrollIntoView();
  };

  render() {
    const {
      colors,
      transformLocale,
      background,
      group,
      cart,
      wishList,
      stockNotificationList,
    } = this.props;
    const { params, products, total } = this.state;
    const { sort, limit } = params;

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
            {transformLocale(group.title)}
            <SortIcon
              sort={sort}
              style={styles.sort}
              onClick={() =>
                this.getProductsData({
                  ...params,
                  sort: sort === 'asc' ? 'desc' : 'asc',
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
                  cart={cart}
                  wishList={wishList}
                  stockNotificationList={stockNotificationList}
                />
              ))
            ) : (
              <Spin
                indicator={
                  <Icon type="loading" style={styles.loading(colors)} spin />
                }
              />
            )}
          </div>
          {total && total > limit && (
            <Pagination
              params={params}
              total={total}
              scrollToTop={this.scrollToTop}
              getProductsData={this.getProductsData}
            />
          )}
        </StyleRoot>
      </div>
    );
  }
}
