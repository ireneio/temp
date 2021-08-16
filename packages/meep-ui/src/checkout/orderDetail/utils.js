import { addHours, getUnixTime } from 'date-fns';

export const resetTimer = () => {
  clearTimeout(window.preservedInfoTimer);

  window.preservedInfoTimer = setTimeout(() => {
    window.sessionStorage.clear();
  }, 7200000);

  window.sessionStorage.setItem(
    'expiresAt',
    getUnixTime(addHours(new Date(), 2)),
  );
};
