import { createSelector } from 'reselect';
import { sidebar, fixedtop, secondtop, fixedbottom } from 'template';
import {
  getMenus,
  getLogoUrl,
  getMobileLogoUrl,
  getJoinedPage,
  getLocaleItemsTemplate,
  getCurrencyItemsTemplate,
} from './index';

const getThankYouPage = () => ({
  id: 'thank-you-page',
  title: {
    en_US: 'Checkout',
    zh_TW: '結帳',
  },
  container: 'DefaultContainer',
  blocks: [],
  fixedtop,
  secondtop,
  fixedbottom,
  sidebar,
  useBottom: false,
});

export const getJoinedThankYouPage = createSelector(
  [
    getThankYouPage,
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
