import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { areEqual, emptyFunction } from 'fbjs';
import queryString from 'query-string';
import { ProfileOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Pagination, Select } from 'antd';

import { withTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { Sensor as SensorContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  COLOR_TYPE,
  ONE_OF_LOCALE_TYPE,
  ISLOGIN_TYPE,
} from 'constants/propTypes';
import Link from 'deprecated/link';

import ProductCard from './ProductCard';
import PopUp from './PopUp';
import useProducts from './hooks/useProducts';
import { SORT_OPTIONS } from './constants';
import * as styles from './styles';

@withTranslation('product-list')
@withContext(SensorContext)
@enhancer
@withHook(
  ({
    id,
    params: { offset = 0, sort = 'createdAt-desc', limit = 20, ...restParams },
  }) => {
    const router = useRouter();

    const params = useMemo(() => {
      const options = router.query[id];
      const [pageFromQuery, sortFromQuery] =
        !options || Array.isArray(options) ? [] : options.split(',');

      return {
        id,
        offset:
          pageFromQuery && parseInt(pageFromQuery, 10)
            ? (parseInt(pageFromQuery, 10) - 1) * limit
            : offset,
        sort: sortFromQuery || sort,
        limit,
        ...restParams,
      };
    }, [id, offset, sort, limit, restParams, router]);
    const { data, loading } = useProducts(params);

    return {
      products: data?.computeProductList,
      loading,
      params,
      page: useMemo(() => parseInt(params.offset / params.limit, 10) + 1, [
        params,
      ]),
      router,
    };
  },
)
@radium
export default class ProductList extends React.PureComponent {
  root = React.createRef();

  name = 'product-list';

  state = {
    isGrid: true,
  };

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
    stockNotificationList: PropTypes.arrayOf(
      PropTypes.shape({
        variantId: ID_TYPE.isRequired,
      }),
    ).isRequired,

    /** props from module */
    id: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
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
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    /* eslint-enable react/no-unused-prop-types */
  };

  static defaultProps = {
    carts: null,
    type: 'original',
    popUpGalleryView: 'one',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { carts, stockNotificationList } = nextProps;
    const {
      carts: prevCarts,
      stockNotificationList: prevStockNotificationList,
    } = prevState;

    if (
      !areEqual(carts, prevCarts) ||
      !areEqual(stockNotificationList, prevStockNotificationList)
    )
      return {
        carts,
        stockNotificationList,
        target: null,
      };

    return null;
  }

  handleModalOpen = id => {
    this.setState({
      target: id,
    });
  };

  handleModalClose = () => {
    this.setState({ target: null });
  };

  handleDisplaySwitch = () => {
    this.setState(prevState => ({ isGrid: !prevState.isGrid }));
  };

  renderPagination = (current, type, originalElement) => {
    const {
      id,
      t,
      router: { pathname, query: routerQuery },
      colors,
      page,
      params: { sort },
    } = this.props;
    const query = {
      ...routerQuery,
      [id]: `${current},${sort}`,
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
            isStalled
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
            isStalled
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
            isStalled
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
            isStalled
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
      id,
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
      products,
      isMobile,
      params: { sort, limit, ids },
      page,
      loading,

      t,

      router: { pathname, query },
      colors,
      isLogin,
      transformCurrency,
      hasStoreAppPlugin,
    } = this.props;
    const { target, isGrid } = this.state;
    // FIXME: custom sorting workaround
    const total =
      sort === 'selections' ? String(ids).split(',').length : products?.total;
    const sortOptions = SORT_OPTIONS(ids, sort);

    return (
      <div id={id} style={styles.root} ref={this.root} className={this.name}>
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
                  disabled={(products?.total || 0) === 0}
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
                            ...query,
                            [id]: `1,${option.value}`,
                          })}`}
                          isStalled
                        >
                          <span>{t(option.text)}</span>
                        </Link>
                      )}
                    </Select.Option>
                  ))}
                </Select>
              )}
              <div style={styles.display} onClick={this.handleDisplaySwitch}>
                {isGrid ? <ProfileOutlined /> : <AppstoreOutlined />}
              </div>
            </div>

            <ProductCard
              loading={loading}
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
                onChange={emptyFunction}
                hideOnSinglePage
                showLessItems
                showSizeChanger={false}
              />
            </div>

            <PopUp
              className={this.name}
              title={t('modal-title')}
              visible={Boolean(target)}
              onCancel={this.handleModalClose}
              type={type}
              popUpGalleryView={popUpGalleryView}
              target={target}
            />

            {loading && <div style={styles.loading} />}
          </div>
        </StyleRoot>
      </div>
    );
  }
}
