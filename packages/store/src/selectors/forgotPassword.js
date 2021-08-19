import { createSelector } from 'reselect';
import { sidebar, fixedtop, secondtop, fixedbottom } from 'template';
import { getMenus, getJoinedPage } from './index';

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
  [getForgotPasswordPage, getMenus],
  getJoinedPage,
);
