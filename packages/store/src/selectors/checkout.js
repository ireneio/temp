import { createSelector } from 'reselect';
import { getIn } from 'utils';
import { fixedtop, secondtop, fixedbottom, sidebar } from 'template';
import {
  getMenus,
  getLogoUrl,
  getMobileLogoUrl,
  getJoinedPage,
  getLocaleItemsTemplate,
  getCurrencyItemsTemplate,
} from './index';

const getCheckoutPage = (state, props) => ({
  id: 'page-checkout',
  title: {
    en_US: 'Checkout',
    zh_TW: '結帳',
  },
  container: 'DefaultContainer',
  blocks: [
    {
      id: 'block-checkout',
      width: 100,
      componentWidth: 0,
      padding: 0,
      widgets: [
        {
          widgets: [
            {
              id: 'checkout',
              module: 'checkout',
              products:
                getIn(['memberReducer', 'cart', 'categories', 'products'])(
                  state,
                ) || [],
              orderInfo: props.orderInfo, // 超商門市
              // 鎖國家:存的資料（一邊中文一邊英文）與landing page不同
              countries: state.storeReducer.settings.lockedCountry.map(
                c => (c === 'Taiwan' ? '台灣' : c),
              ),
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

export const getJoinedCheckoutPage = createSelector(
  [
    getCheckoutPage,
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
