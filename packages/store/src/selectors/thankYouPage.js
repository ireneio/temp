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

const getThankYouPage = (state, prevProps) => ({
  id: 'page-thank-you-page',
  title: {
    en_US: 'Checkout',
    zh_TW: '結帳',
  },
  container: 'DefaultContainer',
  blocks: [
    {
      id: 'block-thank-you-page',
      width: 100,
      componentWidth: 0,
      padding: 0,
      widgets: [
        {
          widgets: [
            {
              id: 'thank-you-page',
              module: 'thank-you-page',
              orderId: prevProps.orderId,
            },
          ],
        },
      ],
    },
  ],
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
