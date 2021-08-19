import { createSelector } from 'reselect';
import { sidebar, fixedtop, secondtop, fixedbottom } from 'template';
import { getMenus, getJoinedPage } from './index';

const getThankYouPage = () => ({
  id: 'thank-you-page',
  title: {
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
  [getThankYouPage, getMenus],
  getJoinedPage,
);
