import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { Menu } from 'antd';

import { withTranslation } from '@meepshop/locales';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';
import { Currency as CurrencyContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import {
  LOCATION_TYPE,
  ONE_OF_LOCALE_TYPE,
  ISLOGIN_TYPE,
  ID_TYPE,
  URL_TYPE,
  POSITIVE_NUMBER_TYPE,
  LOCALE_TYPE,
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

@withTranslation(['common', 'menu'])
@withContext(CurrencyContext)
@withHook(() => ({
  router: useRouter(),
}))
@enhancer
export default class MenuItem extends React.PureComponent {
  generateURL = memoizeOne(notMemoizedGenerateURL);

  SubMenu = withTranslation(['common', 'menu'])(
    withContext(CurrencyContext)(
      withHook(() => ({
        router: useRouter(),
      }))(enhancer(MenuItem)),
    ),
  );

  static propTypes = {
    /** context, TODO: remove */
    toggleCart: PropTypes.func.isRequired,
    location: LOCATION_TYPE.isRequired,
    locale: ONE_OF_LOCALE_TYPE.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    logout: PropTypes.func.isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,

    /** props */
    t: PropTypes.func.isRequired,
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
    params: null,

    /** ignore */
    menuItemStyle: {},
  };

  onClick = async () => {
    const {
      /** context */
      isShowCart,
      toggleCart,
      logout,
      isLogin,

      /** props */
      i18n,
      id,
      action,
      setCurrency,
    } = this.props;

    switch (action) {
      case 5:
        toggleCart(!isShowCart);
        break;

      case 'logout':
        logout();
        break;

      case 'locale':
        if (isLogin !== NOTLOGIN)
          await initApollo({ name: 'store' }).mutate({
            mutation: gql`
              mutation updateShopperLanguagePreference(
                $input: UpdateShopperLanguagePreferenceInput!
              ) {
                updateShopperLanguagePreference(input: $input) {
                  status
                  updateCache(input: $input) @client
                }
              }
            `,
            variables: {
              input: { locale: id },
            },
          });

        i18n.changeLanguage(id);

        break;

      case 'currency':
        setCurrency(id);
        break;

      default:
        break;
    }
  };

  getTitle = () => {
    const {
      /** context */
      isLogin,
      user,

      /** props */
      t,
      i18n,
      id,
      action,
      title,
      params,
    } = this.props;

    switch (action) {
      case 'locale':
        return t(`menu:${id}`);

      case 'currency':
        switch (id) {
          case 'CNY':
          case 'JPY':
            return `¥ ${id}`;

          case 'EUR':
            return '€ EUR';

          case 'VND':
            return '₫ VND';

          case 'KRW':
            return '₩ KRW';

          case 'MYR':
            return 'RM MYR';

          case 'TWD':
          case 'USD':
          case 'HKD':
          default:
            return `$ ${id}`;
        }

      case 8:
        if (isLogin !== NOTLOGIN)
          return params.displayMemberGroup && user?.memberGroup?.name
            ? user.memberGroup.name
            : null;

        return title[i18n.language] || title.zh_TW;

      default:
        switch (id) {
          case 'ORDERS':
          case 'SETTINGS':
          case 'RECIPIENTS':
          case 'PASSWORD_CHANGE':
          case 'WISHLIST':
          case 'REWARD_POINTS':
          case 'LOGOUT':
            return t(`menu:${id}`);

          default:
            return title[i18n.language] || title.zh_TW;
        }
    }
  };

  getActive = url => {
    const {
      /** context */
      router,
      locale,
      currency,

      /** props */
      id,
      action,
    } = this.props;

    switch (action) {
      case 8:
        return /\/login/.test(router.pathname) ? 'is-active' : '';

      default:
        if (id === locale || id === currency) return styles.fontBold;

        return [
          router.asPath,
          `http://${router.domain}${router.asPath}`,
          `https://${router.domain}${router.asPath}`,
        ].includes(url)
          ? 'is-active'
          : '';
    }
  };

  getPages = () => {
    const { user, isLogin, hasStoreAppPlugin, action, pages } = this.props;

    switch (action) {
      case 5:
        return [];

      case 6:
        return (user?.store?.setting?.locale || []).map(locale => ({
          id: locale,
          title: null,
          action: 'locale',
        }));

      case 7:
        return (user?.store?.setting?.currency || []).map(currency => ({
          id: currency,
          title: null,
          action: 'currency',
        }));

      case 8:
        return isLogin === NOTLOGIN
          ? []
          : [
              {
                id: 'ORDERS',
                title: null,
                action: 2,
                params: { url: '/orders' },
              },
              {
                id: 'SETTINGS',
                title: null,
                action: 2,
                params: { url: '/settings' },
              },
              {
                id: 'RECIPIENTS',
                title: null,
                action: 2,
                params: { url: '/recipients' },
              },
              {
                id: 'PASSWORD_CHANGE',
                title: null,
                action: 2,
                params: { url: '/passwordChange' },
              },
              ...(!hasStoreAppPlugin('wishList')
                ? []
                : [
                    {
                      id: 'WISHLIST',
                      title: null,
                      action: 2,
                      params: { url: '/wishlist' },
                    },
                  ]),
              {
                id: 'REWARD_POINTS',
                title: null,
                action: 2,
                params: { url: '/rewardPoints' },
              },
              {
                id: 'LOGOUT',
                title: null,
                action: 'logout',
              },
            ];

      default:
        return pages;
    }
  };

  render() {
    const {
      /** context */
      toggleCart,
      isLogin,
      hasStoreAppPlugin,

      /** props */
      image,
      imagePosition,
      params,
      id: itemId,
      action,
      newWindow,
      level,
      isModule,

      /** ignore */
      menuItemStyle,
      hasLevelThree,
      iconSize,
      ...props
    } = this.props;

    if (itemId === 'favorites' && !hasStoreAppPlugin('wishList')) return null;

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
    const iconProps = !(action === 8 && isLogin !== NOTLOGIN)
      ? { image, imagePosition }
      : {
          image: image || {
            __typename: 'DefaultIcon',
            icon: 'PERSON',
          },
          imagePosition: !title ? 'ONLY' : imagePosition,
        };

    const pages = this.getPages();
    const menuItemProps = {
      ...removeContextTpyesFromProps({ ...props, id: itemId }),
      hasLevelThree,
      level,
      className: `${styles.menuItem} ${
        action === 8 && isLogin !== NOTLOGIN ? 'is-login' : ''
      } menu-${level} ${this.getActive(url)}`,
      onClick: this.onClick,

      // FIXME: T5024 for condition in chrome in iPad
      onTitleClick: ({ domEvent }) => {
        if (!navigator.userAgent.includes('iPad') || !newWindow) return;

        domEvent.preventDefault();
        domEvent.stopPropagation();
        window.open(url);
      },
      children: (
        <Link href={url} target={newWindow ? '_blank' : '_self'}>
          {!iconProps.image ? (
            title
          ) : (
            <Icon {...iconProps} iconSize={iconSize} isModule={isModule}>
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
              React.createElement(this.SubMenu, {
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
