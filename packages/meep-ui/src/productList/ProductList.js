import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { areEqual } from 'fbjs';
import queryString from 'query-string';
import { Pagination, Select, Icon } from 'antd';
import hash from 'hash.js';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  COLOR_TYPE,
  ONE_OF_LOCALE_TYPE,
  ISLOGIN_TYPE,
  LOCATION_TYPE,
} from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';
import Link from 'deprecated/link';

import ProductCard from './ProductCard';
import PopUp from './PopUp';
import { SORT_OPTIONS } from './constants';
import * as styles from './styles';
import * as LOCALE from './locale';
import getProductsQuery from './utils/getProductsQuery';

@enhancer
@radium
export default class ProductList extends React.PureComponent {
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
    productListCache: PropTypes.shape({}).isRequired,

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
    type: PropTypes.oneOf(['original', 'pop-up']),
    popUpGalleryView: PropTypes.oneOf(['one', 'two', 'all', 'none']),

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
    dispatchAction: PropTypes.func.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  };

  static defaultProps = {
    cart: null,
    type: 'original',
    popUpGalleryView: 'one',
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
      target: null,
      isOpen: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    this.reduceProducts();
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentDidUpdate() {
    this.reduceProducts();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    window.removeEventListener('resize', this.resize);
  }

  reduceProducts = () => {
    const { products, params } = this.state;
    const { adTrack, getData, dispatchAction, productListCache } = this.props;

    // resolved products
    if (products?.then) {
      this.resolveProducts();
      return;
    }

    // fetch products
    if (products === null) {
      const key = JSON.stringify(params);
      const hashcode = hash
        .sha256()
        .update(key)
        .digest('hex');
      const cached = productListCache[hashcode];
      const timestamp = productListCache[`${hashcode}:timestamp`];

      // cached or not
      if (cached && timestamp) {
        const age = (Date.now() - timestamp) / 1000;
        if (age < 600) {
          this.setState({
            products: cached,
            isLoading: false,
            isUsingCache: true,
          });
        } else {
          // get rid of it once expired
          dispatchAction('saveProductList', {
            [hashcode]: null,
            [`${hashcode}:timestamp`]: null,
          });
        }
        return;
      }

      this.setState({
        products: getData(...getProductsQuery(params)),
        isLoading: true,
        isUsingCache: false,
      });
      return;
    }

    // send adTrack each time with resolved products
    if (params.search)
      adTrack('Search', { products, searchString: params.search });
  };

  resolveProducts = async () => {
    // prevent over triggered
    if (this.isResolving) return;

    this.isResolving = true;

    const {
      products,
      params: { sort, ids },
    } = this.state;
    const { dispatchAction } = this.props;

    const result = await products;

    if (this.isUnmounted || !result?.data?.computeProductList) return;

    const resolvedProducts = result.data.computeProductList;

    // FIXME: custom sorting workaround
    if (ids && sort === 'selections') {
      const order = String(ids).split(',');

      resolvedProducts.data = resolvedProducts.data.sort(
        (a, b) => order.indexOf(a.id) - order.indexOf(b.id),
      );
    }

    this.setState(
      prevState => {
        const key = JSON.stringify(prevState.params);
        const hashcode = hash
          .sha256()
          .update(key)
          .digest('hex');
        dispatchAction('saveProductList', {
          [hashcode]: resolvedProducts,
          [`${hashcode}:timestamp`]: Date.now(),
        });
        return {
          products: resolvedProducts,
          isLoading: false,
        };
      },
      () => {
        this.isResolving = false;
      },
    );
  };

  resize = () => {
    this.setState({
      isMobile: window.matchMedia(PHONE_MEDIA.substring(7)).matches,
    });
  };

  handleModalOpen = id => {
    this.setState({
      target: id,
      isOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({ isOpen: false, target: null });
  };

  handleDisplaySwitch = () => {
    this.setState(prevState => ({ isGrid: !prevState.isGrid }));
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

      case 'jump-next':
      case 'jump-prev':
        return (
          <Link
            href={
              page === current
                ? null
                : `${pathname}?${queryString.stringify(query)}`
            }
            style={styles.paginationLink}
          >
            {originalElement}
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
      type,
      popUpGalleryView,

      cart,
      stockNotificationList,
      wishList,

      location: { pathname, search },
      colors,
      isLogin,
      transformLocale,
      transformCurrency,
      hasStoreAppPlugin,
    } = this.props;
    const {
      products,
      params: { sort, limit, ids },
      page,
      target,
      isOpen,
      isGrid,
      isLoading,
      isMobile,
      isUsingCache,
    } = this.state;
    // FIXME: custom sorting workaround
    const total =
      sort === 'selections' ? String(ids).split(',').length : products?.total;

    return (
      <div style={styles.root} className={this.name}>
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
            <div style={styles.sort(showSort)}>
              {showSort && (
                <Select
                  dropdownMatchSelectWidth={false}
                  dropdownClassName={this.name}
                  value={sort}
                  size="large"
                  dropdownAlign={{
                    points: isMobile ? ['tl', 'bl'] : ['tr', 'br'],
                  }}
                >
                  {SORT_OPTIONS(ids).map(option => (
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

            <ProductCard
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
              type={type}
              colors={colors}
              isLogin={isLogin}
              transformLocale={transformLocale}
              transformCurrency={transformCurrency}
              memberSeePrice={hasStoreAppPlugin('memberSeePrice')}
              isUsingCache={isUsingCache}
            />

            {!pagination ? null : (
              <div style={styles.pagination}>
                <Pagination
                  total={total}
                  pageSize={limit}
                  current={page}
                  itemRender={this.renderPagination}
                  hideOnSinglePage
                  showLessItems
                  // FIXME: remove warning
                  onChange={() => {}}
                />
              </div>
            )}

            <PopUp
              className={this.name}
              title={transformLocale(LOCALE.MODAL_TITLE)}
              visible={isOpen}
              onCancel={this.handleModalClose}
              type={type}
              popUpGalleryView={popUpGalleryView}
              cart={cart}
              stockNotificationList={stockNotificationList}
              wishList={wishList}
              products={products}
              target={target}
              isMobile={isMobile}
            />

            {isLoading && <div style={styles.loading} />}
          </div>
        </StyleRoot>
      </div>
    );
  }
}
