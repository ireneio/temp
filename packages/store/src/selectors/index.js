import * as R from 'ramda';
import { createSelector } from 'reselect';
import { getIn, getJoinedModule, setDefaultValueForMenuDesign } from 'utils';
import {
  LOCALE_ITEMS_TMPL,
  CURRENCY_ITEMS_TMPL,
  MEMBER_ITEMS_TMPL,
} from 'template';
import { handlePages } from 'utils/setDefaultValueForMenuDesign';

export const getPages = state => state.pagesReducer;
export const getHomePageId = state =>
  getIn(['storeReducer', 'settings', 'homePageId'])(state) || null;

export const getActivities = state =>
  getIn(['storeReducer', 'activities'])(state) || [];
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

export const getProductListCache = state => getIn(['listsReducer'])(state);

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
    currencyOptions.reduce((options, currency) => {
      const option = CURRENCY_ITEMS_TMPL.find(item => item.id === currency);

      return option ? [...options, option] : options;
    }, []),
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

    const menuPages = (getIn(['pages'])(menu) || []).map(menuPage => {
      switch (menuPage.action) {
        case 6:
          // locale(action = 6)
          return R.pipe(R.assocPath(['pages'], localeItemsTemplate))(menuPage);

        case 7:
          // currency(action = 7)
          return R.pipe(R.assocPath(['pages'], currencyItemsTemplate))(
            menuPage,
          );

        case 8:
          // member(action = 8)
          return R.pipe(
            R.assocPath(['pages'], MEMBER_ITEMS_TMPL),
            R.assocPath(
              ['params', 'displayMemberGroup'],
              !!menuPage.params?.displayMemberGroup,
            ),
          )(menuPage);

        default:
          return menuPage;
      }
    });

    if (ele === 'fixedbottom') {
      const { background, color, fontSize } = joinedPage.fixedbottom || {};
      const { useBottom } = joinedPage;

      /**
       * useBottom default should be true, but it can be null, now.
       */
      if (useBottom !== false) {
        menu = {
          design: {
            showLogo: false,
            showSearchbar: false,
            expandSubItem: true,
            alignment: 'center',
            pattern: 0,
            opacity: 1,
            normal: {
              background,
              color,
            },
            active: {},
            hover: {},
            fontSize: fontSize || 13,
            font: '黑體',
            width: 0,
            height: 0,
          },
          pages: handlePages(menuPages, true),
        };
      }
    } else {
      menu = {
        ...menu,
        design: {
          ...menu.design,
          width: ele === 'sidebar' ? menu.design?.width : 0,
          height: ele !== 'sidebar' ? menu.design?.height : 0,
        },
        pages: menuPages,
      };
    }

    joinedPage = R.pipe(
      R.assocPath([ele, 'id'], ele),
      R.assocPath([ele, 'menu'], menu),
      R.assocPath([ele, 'logo'], logoUrl),
      R.assocPath([ele, 'mobileLogo'], mobileLogoUrl),
    )(joinedPage);
  });

  if (joinedPage.useBottom === false) joinedPage.fixedbottom = null;

  return joinedPage;
};

export const getHomePage = createSelector(
  [getPages, getHomePageId],
  (pages, homePageId) => {
    const homePages = pages.filter(page => page.pageType === 'home');
    if (homePageId)
      return homePages.find(page => page.id === homePageId) || homePages[0];
    return homePages[0];
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
    getActivities,
    getStockNotificationList,
    getWishList,
    // getProductListCache
    getProductListCache,
  ],
  (
    page,
    query,
    menus,
    localeItemsTemplate,
    currencyItemsTemplate,
    // product,
    activities,
    stockNotificationList,
    wishList,
    // productList
    productListCache,
  ) => {
    const blocks = page.blocks.map(({ widgets, ...block }) => ({
      ...block,
      widgets: getJoinedModule(widgets, {
        query,
        menus,
        localeItemsTemplate,
        currencyItemsTemplate,
        // product,
        activities,
        stockNotificationList,
        wishList,
        // productList
        productListCache,
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
