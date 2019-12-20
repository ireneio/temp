import moment from 'moment';

export const resetTimer = () => {
  clearTimeout(window.preservedInfoTimer);

  window.preservedInfoTimer = setTimeout(() => {
    window.sessionStorage.clear();
  }, 7200000);

  window.sessionStorage.setItem(
    'expiresAt',
    moment()
      .add(2, 'h')
      .unix(),
  );
};
