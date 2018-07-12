import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { enhancer } from 'layout/DecoratorsRoot';
import areEqual from 'fbjs/lib/areEqual';

import { ID_TYPE, COLOR_TYPE, LOCALE_TYPE } from 'constants/propTypes';

import { Spin, Icon } from 'antd';

import Product from './Product';
import Pagination from './Pagination';
import SortIcon from './SortIcon';

import * as styles from './styles';

@enhancer
@radium
export default class Group extends React.Component {
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
    const ids = this.props.group.products.map(product => product.productId);
    this.getProductsData({ ...this.state.params, ids });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !areEqual(this.props.group, nextProps.group) ||
      !areEqual(this.props.cart, nextProps.cart) ||
      !areEqual(this.state.params, nextState.params) ||
      !areEqual(this.state.products, nextState.products) ||
      this.state.total !== nextState.total
    );
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

    const productQuery = `
      data {
        id
        status
        title{
          zh_TW
          en_US
        }
        gallery {
          mainId
          media
        }
        galleryInfo {
          media
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
      query Root($search: searchInputObjectType) {
        computeProductList(search: $search) {
          ${productQuery}
        }
      }
    `;

    const {
      data: { computeProductList },
    } = await this.props.getData(query, variables);
    this.setState({
      products: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
        ? computeProductList.data.computeProductList.data
        : computeProductList.data,
      total: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
        ? computeProductList.data.computeProductList.total
        : computeProductList.total,
    });
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
                  ...this.state.params,
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
          {total &&
            total > limit && (
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
