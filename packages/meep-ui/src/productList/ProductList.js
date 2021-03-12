import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { areEqual } from 'fbjs';
import queryString from 'query-string';
import { Pagination, Select, Icon } from 'antd';
import hash from 'hash.js';

import { withTranslation } from '@meepshop/locales';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

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
import { SORT_OPTIONS, DEFAULT_PRODUCTS } from './constants';
import * as styles from './styles';
import getProductsQuery, {
  getOriginalProductsQuery,
} from './utils/getProductsQuery';

@withTranslation('product-list')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
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
    stockNotificationList: PropTypes.arrayOf(
      PropTypes.shape({
        variantId: ID_TYPE.isRequired,
      }),
    ).isRequired,

    /** props from module */
    id: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    adTrack: PropTypes.func.isRequired,
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
    type: PropTypes.oneOf(['original', 'pop-up']),
    popUpGalleryView: PropTypes.oneOf(['one', 'two', 'all', 'none']),

    /** props from context */
    carts: PropTypes.shape({}),
    locale: ONE_OF_LOCALE_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    getData: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  };

  static defaultProps = {
    carts: null,
    type: 'original',
    popUpGalleryView: 'one',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      // default params
      params: {
        offset = 0,
        sort = 'createdAt-desc',
        limit = 20,
        ...restParams
      },
      location: { search },
      isLogin,
      carts,
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
      carts: prevCarts,
      stockNotificationList: prevStockNotificationList,
    } = prevState;

    if (areEqual(params, prevStateParams)) {
      return {
        isLogin,
        carts,
        stockNotificationList,
        // fetchProducts when login status changed
        ...(isLogin !== prevIsLogin && {
          products: getData(...getProductsQuery(params)),
          isLoading: true,
        }),
        // close modal after adding
        ...(!areEqual(carts, prevCarts) ||
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
      carts,
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
            isDefaultProducts: productListCache.isDefaultProducts,
            isLoading: false,
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
      });
      return;
    }

    // send adTrack each time with resolved products
    if (params.search)
      adTrack.search({ searchString: params.search, products: products.data });
  };

  resolveProducts = async () => {
    // prevent over triggered
    if (this.isResolving) return;

    this.isResolving = true;

    const {
      products,
      params: { sort, ids },
    } = this.state;
    const { getData, dispatchAction, productListCache } = this.props;

    const result = await products;

    if (this.isUnmounted || !result?.data?.computeProductList) return;

    let isDefaultProducts;
    if (typeof productListCache.isDefaultProducts === 'boolean') {
      isDefaultProducts = productListCache.isDefaultProducts;
    } else {
      const originalProducts = await getData(...getOriginalProductsQuery());
      isDefaultProducts = !originalProducts.data.computeProductList.total;
    }

    const resolvedProducts = isDefaultProducts
      ? DEFAULT_PRODUCTS
      : result.data.computeProductList;

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
          isDefaultProducts,
          [`${hashcode}:timestamp`]: Date.now(),
        });
        return {
          isDefaultProducts,
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
      t,
      location: { pathname, search },
      colors,
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
            <span style={styles.paginationItem(colors)}>{t('prev-page')}</span>
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
            <span style={styles.paginationItem(colors)}>{t('next-page')}</span>
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
      type,
      popUpGalleryView,

      t,

      location: { pathname, search },
      colors,
      isLogin,
      transformCurrency,
      hasStoreAppPlugin,
    } = this.props;
    const {
      isDefaultProducts,
      products,
      params: { sort, limit, ids },
      page,
      target,
      isOpen,
      isGrid,
      isLoading,
      isMobile,
    } = this.state;
    // FIXME: custom sorting workaround
    const total =
      sort === 'selections' ? String(ids).split(',').length : products?.total;
    const sortOptions = SORT_OPTIONS(ids, sort);

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
                  value={
                    sortOptions.some(option => option.value === sort)
                      ? sort
                      : 'createdAt-desc'
                  }
                  size="large"
                  disabled={isDefaultProducts}
                  dropdownAlign={{
                    points: isMobile ? ['tl', 'bl'] : ['tr', 'br'],
                  }}
                >
                  {sortOptions.map(option => (
                    <Select.Option key={option.value} value={option.value}>
                      {sort === option.value ? (
                        t(option.text)
                      ) : (
                        <Link
                          href={`${pathname}?${queryString.stringify({
                            ...queryString.parse(search),
                            sort: option.value,
                            offset: 0,
                          })}`}
                        >
                          <span>{t(option.text)}</span>
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
              isDefaultProducts={isDefaultProducts}
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
              transformCurrency={transformCurrency}
              memberSeePrice={hasStoreAppPlugin('memberSeePrice')}
            />

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

            <PopUp
              className={this.name}
              title={t('modal-title')}
              visible={isOpen}
              onCancel={this.handleModalClose}
              type={type}
              popUpGalleryView={popUpGalleryView}
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
