import { createSelector } from 'reselect';
import { sidebar, fixedtop, secondtop, fixedbottom } from 'template';
import {
  getMenus,
  getLogoUrl,
  getMobileLogoUrl,
  getLocaleItemsTemplate,
  getCurrencyItemsTemplate,
  getJoinedPage,
} from './index';

const getForgotPasswordPage = () => {
  return {
    id: 'page-forgot-password',
    title: {
      zh_TW: '重置密碼',
    },
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop,
    secondtop,
    fixedbottom,
    sidebar,
  };
};

export const getJoinedForgotPasswordPage = createSelector(
  [
    getForgotPasswordPage,
    getMenus,
    getLogoUrl,
    getMobileLogoUrl,
    getLocaleItemsTemplate,
    getCurrencyItemsTemplate,
  ],
  (
    page,
    menus,
    logoUrl,
    mobileLogoUrl,
    localeItemsTemplate,
    currencyItemsTemplate,
  ) =>
    getJoinedPage(
      page,
      menus,
      logoUrl,
      mobileLogoUrl,
      localeItemsTemplate,
      currencyItemsTemplate,
    ),
);
