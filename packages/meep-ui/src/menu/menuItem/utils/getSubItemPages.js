import { NOTLOGIN } from 'constants/isLogin';

export default ({ isLogin, action, pages }) => {
  if (action === 8 && isLogin === NOTLOGIN) {
    return [];
  }

  return (pages || []).filter(
    ({ action: pageAction }) => ![4, 8].includes(pageAction),
  );
};
