import { createSelector } from 'reselect';
import { fixedtop, secondtop, fixedbottom, sidebar } from 'template';
import { getMenus, getJoinedPage } from './index';

const loginPage = {
  id: 'page-login',
  title: {
    zh_TW: '登入',
  },
  container: 'TwoTopsContainer',
  blocks: [],
  fixedtop,
  secondtop,
  fixedbottom,
  sidebar,
};

const getLoginPage = () => loginPage;

export const getJoinedLoginPage = createSelector(
  [getLoginPage, getMenus],
  getJoinedPage,
);
