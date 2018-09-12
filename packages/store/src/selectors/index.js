import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getIn, getJoinedModule, setDefaultValueForMenuDesign } from 'utils';
import {
  LOCALE_ITEMS_TMPL,
  CURRENCY_ITEMS_TMPL,
  MEMBER_ITEMS_TMPL,
} from 'template';

export const getPages = state => state.pagesReducer;
export const getHomePageId = state =>
  getIn(['storeReducer', 'settings', 'homePageId'])(state) || null;

export const getCart = state => getIn(['memberReducer', 'cart'])(state) || null;
export const getUser = state => getIn(['memberReducer', 'user'])(state) || null;
export const getMemberGroups = state =>
  getIn(['storeReducer', 'memberGroups'])(state) || [];
export const getActivities = state =>
  getIn(['storeReducer', 'activities'])(state) || [];
export const getStoreAppList = state => state.storeReducer.apps || [];
export const getStockNotificationList = state =>
  getIn(['memberReducer', 'stockNotificationList'])(state) || [];
export const getWishList = state =>
  getIn(['memberReducer', 'wishList'])(state) || [];

export const getMenus = state => getIn(['storeReducer', 'menus'])(state);
export const getLogoUrl = state =>
  getIn(['storeReducer', 'settings', 'logoUrl'])(state);
export const getMobileLogoUrl = state =>
  getIn(['storeReducer', 'settings', 'mobileLogoUrl'])(state);
export const getLocaleOptions = state =>
  getIn(['storeReducer', 'settings', 'localeOptions'])(state);
export const getCurrencyOptions = state =>
  getIn(['storeReducer', 'settings', 'currencyOptions'])(state);

export const getQuery = (state, props) => getIn(['url', 'query'])(props) || {};

export const getLocaleItemsTemplate = createSelector(
  [getLocaleOptions],
  localeOptions =>
    LOCALE_ITEMS_TMPL.reduce((items, item) => {
      if (localeOptions.includes(item.id)) {
        return items.concat([item]);
      }
      return items;
    }, []),
);

export const getCurrencyItemsTemplate = createSelector(
  [getCurrencyOptions],
  currencyOptions =>
    CURRENCY_ITEMS_TMPL.reduce((items, item) => {
      if (currencyOptions.includes(item.id)) {
        return items.concat([item]);
      }
      return items;
    }, []),
);

export const getJoinedUser = createSelector(
  [getUser, getMemberGroups],
  (user, memberGroups) => {
    const groupId = getIn(['groupId'])(user);
    const memberGroup = R.find(R.propEq('id', groupId))(memberGroups);
    return R.assocPath(['groupName'], memberGroup && memberGroup.name)(user);
  },
);

export const getJoinedPage = (
  page,
  menus,
  logoUrl,
  mobileLogoUrl,
  localeItemsTemplate,
  currencyItemsTemplate,
) => {
  let joinedPage = page;
  ['fixedtop', 'secondtop', 'sidebar', 'fixedbottom'].forEach(ele => {
    let menuId = getIn([ele, 'menuId'])(joinedPage);
    if (menuId === '') {
      menuId = ele;
    }
    let menu =
      R.find(R.propEq('id', menuId))(menus) ||
      R.find(R.propEq('menuType', menuId || ele))(menus) ||
      setDefaultValueForMenuDesign([]);
    let menuPages = getIn(['pages'])(menu) || [];
    if (menuPages.length > 0) {
      menuPages = menuPages.map(menuPage => {
        let newMenuPage = menuPage;
        if (menuPage.action === 6) {
          // locale(action = 6)
          newMenuPage = R.assocPath(['pages'], localeItemsTemplate, menuPage);
        } else if (menuPage.action === 7) {
          // currency(action = 7)
          newMenuPage = R.assocPath(['pages'], currencyItemsTemplate, menuPage);
        } else if (menuPage.action === 8) {
          // member(action = 8)
          newMenuPage = R.assocPath(['pages'], MEMBER_ITEMS_TMPL, menuPage);
        }
        return newMenuPage;
      });
    }
    if (ele === 'fixedbottom') {
      const {
        fixedbottom: { background, color, fontSize },
        useBottom = true,
      } = joinedPage;
      menu = {
        design: {
          background,
          color,
          fontSize: fontSize || 13,
          useBottom,
        },
        pages: menuPages,
      };
    }
    menu = R.assocPath(['pages'], menuPages, menu);
    joinedPage = R.pipe(
      R.assocPath([ele, 'menu'], menu),
      R.assocPath([ele, 'logo'], logoUrl),
      R.assocPath([ele, 'mobileLogo'], mobileLogoUrl),
    )(joinedPage);
  });
  return joinedPage;
};

export const getHomePage = createSelector(
  [getPages, getHomePageId],
  (pages, homePageId) => {
    if (homePageId)
      return pages.find(page => page.id === homePageId) || pages[0];
    return pages[0];
  },
);

export const getJoinedModulePage = createSelector(
  [
    getHomePage,
    getQuery,
    getMenus,
    getLocaleItemsTemplate,
    getCurrencyItemsTemplate,
    // getProduct,
    getCart,
    getActivities,
    getStoreAppList,
    getStockNotificationList,
    getWishList,
  ],
  (
    page,
    query,
    menus,
    localeItemsTemplate,
    currencyItemsTemplate,
    // product,
    cart,
    activities,
    storeApps,
    stockNotificationList,
    wishList,
  ) => {
    const blocks = page.blocks.map(({ widgets, ...block }) => ({
      ...block,
      widgets: getJoinedModule(widgets, {
        query,
        menus,
        localeItemsTemplate,
        currencyItemsTemplate,
        // product,
        cart,
        activities,
        storeApps,
        stockNotificationList,
        wishList,
      }),
    }));
    return { ...page, blocks };
  },
);

export const getJoinedHomePage = createSelector(
  [
    getJoinedModulePage,
    getMenus,
    getLogoUrl,
    getMobileLogoUrl,
    getLocaleItemsTemplate,
    getCurrencyItemsTemplate,
  ],
  (
    homePage,
    menus,
    logoUrl,
    mobileLogoUrl,
    localeItemsTemplate,
    currencyItemsTemplate,
  ) =>
    getJoinedPage(
      homePage,
      menus,
      logoUrl,
      mobileLogoUrl,
      localeItemsTemplate,
      currencyItemsTemplate,
    ),
);
