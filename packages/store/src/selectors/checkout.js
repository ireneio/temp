import { createSelector } from 'reselect';
import { fixedtop, secondtop, fixedbottom, sidebar } from 'template';
import { getMenus, getJoinedPage } from './index';

const getCheckoutPage = (state, prevProps) => ({
  id: 'page-checkout',
  title: {
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
              orderInfo: prevProps.orderInfo, // 超商門市
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
  [getCheckoutPage, getMenus],
  getJoinedPage,
);
