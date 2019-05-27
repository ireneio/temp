import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { Menu } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import {
  LOCATION_TYPE,
  ONE_OF_LOCALE_TYPE,
  ONE_OF_CURRENCY_TYPE,
  ISLOGIN_TYPE,
  ID_TYPE,
  URL_TYPE,
  POSITIVE_NUMBER_TYPE,
  LOCALE_TYPE,
  USER_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';
import removeContextTpyesFromProps from 'utils/removeContextTpyesFromProps';

import CartCount from './CartCount';
import SearchBar from './SearchBar';
import Icon from './Icon';
import { BUILTIN_PLACEMENTS } from './constants';
import notMemoizedGenerateURL from './utils/generateURL';
import styles from './styles/menuItem.less';

const { Item: AntdMenuItem, SubMenu } = Menu;

@enhancer
export default class MenuItem extends React.PureComponent {
  generateURL = memoizeOne(notMemoizedGenerateURL);

  static propTypes = {
    /** context, TODO: remove */
    transformLocale: PropTypes.func.isRequired,
    toggleCart: PropTypes.func.isRequired,
    location: LOCATION_TYPE.isRequired,
    locale: ONE_OF_LOCALE_TYPE.isRequired,
    customerCurrency: ONE_OF_CURRENCY_TYPE.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
    setCustomerCurrency: PropTypes.func.isRequired,
    carts: PropTypes.shape({}).isRequired,
    user: USER_TYPE.isRequired,

    /** props */
    icon: PropTypes.shape({}),
    iconSize: PropTypes.oneOf([24, 32, 48]).isRequired,
    params: PropTypes.shape({
      path: PropTypes.string,
      pageId: PropTypes.oneOfType([PropTypes.oneOf(['Home']), ID_TYPE]),
      url: URL_TYPE,
      query_string: PropTypes.string,
      sort: PropTypes.shape({
        order: PropTypes.oneOf(['desc', 'asc']).isRequired,
      }),
      price: PropTypes.shape({
        gte: POSITIVE_NUMBER_TYPE.isRequired,
        lte: POSITIVE_NUMBER_TYPE.isRequired,
      }),
      from: PropTypes.number,
      size: PropTypes.number,
      displayMemberGroup: PropTypes.bool,
    }),
    id: ID_TYPE.isRequired,
    action: PropTypes.oneOf([
      0, // empty
      1, // go to page
      2, // go to url
      3, // go to filer
      5, // show cart
      6, // change language
      7, // change currency
      8, // member
      'searchBar',
      'logout',
      'locale',
      'currency',
    ]).isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
      }).isRequired,
    ).isRequired,
    newWindow: PropTypes.bool.isRequired,
    title: LOCALE_TYPE.isRequired,

    /** ignore */
    menuItemStyle: PropTypes.shape({}),
    hasLevelThree: PropTypes.bool.isRequired,
    level: POSITIVE_NUMBER_TYPE.isRequired, // generate by antd/menu
  };

  static defaultProps = {
    /** props */
    icon: null,
    params: null,

    /** ignore */
    menuItemStyle: {},
  };

  onClick = () => {
    const {
      /** context */
      toggleCart,
      logout,
      setLocale,
      setCustomerCurrency,

      /** props */
      id,
      action,
    } = this.props;

    switch (action) {
      case 5:
        toggleCart()();
        break;

      case 'logout':
        logout();
        break;

      case 'locale':
        setLocale(id);
        break;

      case 'currency':
        setCustomerCurrency(id);
        break;

      default:
        break;
    }
  };

  getTitle = () => {
    const {
      /** context */
      transformLocale,
      isLogin,
      user,

      /** props */
      action,
      title,
      params,
    } = this.props;

    if (action === 8 && isLogin !== NOTLOGIN)
      return params.displayMemberGroup && user.groupName
        ? user.groupName
        : null;

    return transformLocale(title);
  };

  getActive = url => {
    const {
      /** context */
      location: { pathname, search },
      locale,
      customerCurrency,

      /** props */
      id,
      action,
    } = this.props;

    switch (action) {
      case 8:
        return /\/login/.test(pathname) ? 'is-active' : '';

      default:
        if (id === locale || id === customerCurrency) return styles.fontBold;

        return url === decodeURIComponent(`${pathname}${search}`)
          ? 'is-active'
          : '';
    }
  };

  render() {
    const {
      /** context */
      toggleCart,
      isLogin,
      // TODO: carts should not be undefined
      carts,

      /** props */
      icon: propsIcon,
      params,
      action,
      pages: propsPages,
      newWindow,
      level,

      /** ignore */
      menuItemStyle,
      hasLevelThree,
      iconSize,
      ...props
    } = this.props;

    const title = this.getTitle();

    if (action === 'searchBar')
      return (
        <li
          className={`${styles.menuItem} menu-${level} ant-menu-item searchBar`}
        >
          <SearchBar title={title} />
        </li>
      );

    const url = this.generateURL(action, params, isLogin);
    const icon = !(action === 8 && isLogin !== NOTLOGIN)
      ? propsIcon
      : {
          ...propsIcon,
          font: propsIcon?.image ? null : propsIcon?.font || 'person',
          image: propsIcon?.font ? null : propsIcon?.image,
          direction: !title ? 'only' : propsIcon?.direction || null,
        };
    const pages = action === 8 && isLogin === NOTLOGIN ? [] : propsPages;

    const menuItemProps = {
      ...removeContextTpyesFromProps(props),
      hasLevelThree,
      level,
      className: `${styles.menuItem} ${
        action === 8 && isLogin !== NOTLOGIN ? 'is-login' : ''
      } menu-${level} ${this.getActive(url)}`,
      onClick: this.onClick,
      children: (
        <Link href={url} target={newWindow ? '_blank' : '_self'}>
          {!icon ? (
            title
          ) : (
            <Icon {...icon} iconSize={iconSize}>
              {title}
            </Icon>
          )}
        </Link>
      ),
    };

    /**
     * title will be added in DOM, it should be removed.
     */
    delete menuItemProps.title;

    return (
      <CartCount showCartCount={action === 5}>
        {(pages || []).length !== 0 ? (
          <SubMenu
            {...menuItemProps}
            title={menuItemProps.children}
            builtinPlacements={level === 1 ? BUILTIN_PLACEMENTS : undefined}
          >
            {pages.map(({ id, pages: subPages, ...page }) =>
              React.createElement(enhancer(MenuItem), {
                ...page,
                key: id,
                id,
                pages: !hasLevelThree ? [] : subPages,
                style: menuItemStyle,
              }),
            )}
          </SubMenu>
        ) : (
          <AntdMenuItem {...menuItemProps} />
        )}
      </CartCount>
    );
  }
}
