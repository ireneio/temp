import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { areEqual } from 'fbjs';
import queryString from 'query-string';
import { Modal, Pagination, Select, Icon } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  COLOR_TYPE,
  ONE_OF_LOCALE_TYPE,
  ISLOGIN_TYPE,
  LOCATION_TYPE,
} from 'constants/propTypes';
import Link from 'link';
import ProductCarousel from 'productCarousel';
import ProductInfo from 'productInfo';

import ProductTable from './ProductTable';
import { SORT_OPTIONS } from './constants';
import * as styles from './styles';
import * as LOCALE from './locale';
import getProductsQuery from './utils/getProductsQuery';

@enhancer
@radium
export default class ProductList extends React.PureComponent {
  root = React.createRef();

  name = 'product-list';

  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    params: PropTypes.shape({
      ids: PropTypes.string,
      tags: PropTypes.string,
      price: PropTypes.string,
      search: PropTypes.string,
      includedAllTags: PropTypes.bool,
      offset: PropTypes.number,
      sort: PropTypes.string,
      limit: PropTypes.number,
    }).isRequired,

    /** props for ProductInfo */
    cart: PropTypes.shape({}),
    wishList: PropTypes.arrayOf(
      PropTypes.shape({
        productId: ID_TYPE.isRequired,
      }),
    ).isRequired,
    stockNotificationList: PropTypes.arrayOf(
      PropTypes.shape({
        variantId: ID_TYPE.isRequired,
      }),
    ).isRequired,

    /** props from module */
    showSort: PropTypes.bool.isRequired,
    alignment: PropTypes.string.isRequired,
    justifyContent: PropTypes.string.isRequired,
    alignItems: PropTypes.string.isRequired,
    productWidth: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,
    showTitle: PropTypes.bool.isRequired,
    showDescription: PropTypes.bool.isRequired,
    showPrice: PropTypes.bool.isRequired,
    cartButton: PropTypes.bool.isRequired,
    pagination: PropTypes.bool.isRequired,

    /** props from context */
    locale: ONE_OF_LOCALE_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    getData: PropTypes.func.isRequired,
    adTrack: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  };

  static defaultProps = {
    cart: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      // default params
      params: {
        offset = 0,
        sort = 'createdOn-desc',
        limit = 20,
        ...restParams
      },
      location: { search },
      isLogin,
      cart,
      stockNotificationList,
      getData,
    } = nextProps;

    const params = {
      offset,
      sort,
      limit,
      ...restParams,
      ...queryString.parse(search),
    };

    const {
      params: prevStateParams,
      isGrid = true,
      cache = {},
      isLogin: prevIsLogin,
      cart: prevCart,
      stockNotificationList: prevStockNotificationList,
    } = prevState;

    if (areEqual(params, prevStateParams)) {
      return {
        isLogin,
        cart,
        stockNotificationList,
        // fetchProducts when login status changed
        ...(isLogin !== prevIsLogin && {
          products: getData(...getProductsQuery(params)),
          isLoading: true,
          cache: {},
        }),
        // close modal after adding
        ...(!areEqual(cart, prevCart) ||
        !areEqual(stockNotificationList, prevStockNotificationList)
          ? {
              isOpen: false,
              target: null,
            }
          : {}),
      };
    }

    // when params changed
    return {
      products: null,
      page: parseInt(params.offset / params.limit, 10) + 1,
      params,
      isLogin,
      cart,
      stockNotificationList,
      isGrid,
      cache,
      target: null,
      isOpen: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.reduceProducts();
  }

  componentDidUpdate() {
    this.reduceProducts();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  reduceProducts = () => {
    const { products, cache, params } = this.state;
    const { adTrack, getData } = this.props;

    // resolved products
    if (products instanceof Promise) {
      this.resolveProducts();
      return;
    }

    // fetch products
    if (products === null) {
      const key = JSON.stringify(params);

      this.setState({
        products:
          key in cache ? cache[key] : getData(...getProductsQuery(params)),
        isLoading: !(key in cache),
      });
      return;
    }

    // send adTrack each time with resolved products
    if (params.search)
      adTrack('Search', { products, searchString: params.search });
  };

  resolveProducts = async () => {
    const {
      products,
      params: { ids },
    } = this.state;

    const result = await products;

    if (this.isUnmounted || !result?.data?.computeProductList) return;

    const resolvedProducts = result.data.computeProductList;

    // FIXME: 不該由前端排序
    if (ids) {
      const order = String(ids).split(',');

      resolvedProducts.data = resolvedProducts.data.sort(
        (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
      );
    }

    this.setState(prevState => ({
      products: resolvedProducts,
      cache: {
        ...prevState.cache,
        [JSON.stringify(prevState.params)]: resolvedProducts,
      },
      isLoading: false,
    }));
  };

  handleModalOpen = e => {
    this.setState({
      target: e.target.dataset.id,
      isOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({ isOpen: false, target: null });
  };

  handleDisplaySwitch = () => {
    this.setState(prevState => ({ isGrid: !prevState.isGrid }));
  };

  handleParamsChange = () => {
    this.root.current.scrollIntoView();
  };

  generateDetails = () => {
    const { cart, stockNotificationList, wishList } = this.props;
    const { products, target } = this.state;

    // return if no target or products
    if (!target || !products || products instanceof Promise) return null;

    const productData = products.data.find(item => item.id === target);

    // return if no productData
    if (!productData) return null;

    return (
      <div style={styles.modal} id="modal-area">
        <ProductCarousel
          mode="list"
          galleryInfo={productData.galleryInfo}
          autoPlay={false}
          thumbsPosition="bottom"
        />
        <ProductInfo
          mode="list"
          productData={productData}
          cart={cart}
          stockNotificationList={stockNotificationList}
          isInWishList={wishList.some(item => item.productId === target)}
          showButton={false}
          container="modal-area"
        />
      </div>
    );
  };

  renderPagination = (current, type, originalElement) => {
    const {
      location: { pathname, search },
      colors,
      transformLocale,
    } = this.props;
    const {
      page,
      params: { limit },
    } = this.state;
    const query = {
      ...queryString.parse(search),
      offset: (current - 1) * limit,
    };

    switch (type) {
      case 'prev':
        return (
          <Link
            href={
              !current || page === current
                ? null
                : `${pathname}?${queryString.stringify(query)}`
            }
            style={styles.paginationLink}
          >
            <span style={styles.paginationItem(colors)}>
              {transformLocale(LOCALE.PREV_PAGE)}
            </span>
          </Link>
        );

      case 'next':
        return (
          <Link
            href={
              page === current
                ? null
                : `${pathname}?${queryString.stringify(query)}`
            }
            style={styles.paginationLink}
          >
            <span style={styles.paginationItem(colors)}>
              {transformLocale(LOCALE.NEXT_PAGE)}
            </span>
          </Link>
        );

      case 'page':
        return (
          <Link
            href={
              page === current
                ? null
                : `${pathname}?${queryString.stringify(query)}`
            }
            style={styles.paginationLink}
          >
            <span style={styles.paginationItem(colors)}>{current}</span>
          </Link>
        );
      default:
        return originalElement;
    }
  };

  render() {
    const {
      showSort,
      alignment,
      justifyContent,
      alignItems,
      productWidth,
      padding,
      showTitle,
      showDescription,
      showPrice,
      cartButton,
      pagination,

      locale,
      location: { pathname, search },
      colors,
      isLogin,
      transformLocale,
      transformCurrency,
      hasStoreAppPlugin,
    } = this.props;
    const {
      products,
      params: { sort, limit },
      page,
      isOpen,
      isGrid,
      isLoading,
    } = this.state;

    return (
      <div style={styles.root} ref={this.root} className={this.name}>
        <Style
          scopeSelector={`.${this.name}`}
          rules={styles.listStyle(colors, isGrid)}
        />
        <Style
          scopeSelector={`.ant-modal.${this.name}`}
          rules={styles.modalStyle(colors)}
        />
        <StyleRoot>
          <div style={styles.wrapper}>
            <div style={styles.sort}>
              {showSort && (
                <Select
                  dropdownClassName={this.name}
                  value={sort}
                  size="large"
                  onChange={this.handleParamsChange}
                >
                  {SORT_OPTIONS(locale).map(option => (
                    <Select.Option key={option.value} value={option.value}>
                      {sort === option.value ? (
                        transformLocale(LOCALE[option.text])
                      ) : (
                        <Link
                          href={`${pathname}?${queryString.stringify({
                            ...queryString.parse(search),
                            sort: option.value,
                            offset: 0,
                          })}`}
                        >
                          <span>{transformLocale(LOCALE[option.text])}</span>
                        </Link>
                      )}
                    </Select.Option>
                  ))}
                </Select>
              )}
              <div style={styles.display} onClick={this.handleDisplaySwitch}>
                <Icon type={isGrid ? 'profile' : 'appstore'} />
              </div>
            </div>
            <ProductTable
              products={products}
              limit={limit}
              productWidth={productWidth}
              isGrid={isGrid}
              handleModalOpen={this.handleModalOpen}
              alignment={alignment}
              justifyContent={justifyContent}
              alignItems={alignItems}
              padding={padding}
              showTitle={showTitle}
              showDescription={showDescription}
              showPrice={showPrice}
              cartButton={cartButton}
              colors={colors}
              isLogin={isLogin}
              transformLocale={transformLocale}
              transformCurrency={transformCurrency}
              memberSeePrice={hasStoreAppPlugin('memberSeePrice')}
            />

            {!pagination ? null : (
              <div style={styles.pagination}>
                <Pagination
                  total={isLoading ? 0 : products.total}
                  pageSize={limit}
                  current={page}
                  itemRender={this.renderPagination}
                  onChange={this.handleParamsChange}
                  hideOnSinglePage
                  showLessItems
                />
              </div>
            )}

            <Modal
              className={this.name}
              title={transformLocale(LOCALE.MODAL_TITLE)}
              visible={isOpen}
              onCancel={this.handleModalClose}
              footer={null}
              destroyOnClose
            >
              {this.generateDetails()}
            </Modal>

            {isLoading && <div style={styles.loading} />}
          </div>
        </StyleRoot>
      </div>
    );
  }
}
