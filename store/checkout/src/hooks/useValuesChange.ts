// import
import { useCallback } from 'react';

import useResetTimer from './useResetTimer';
import { PRESERVED_FIELDS, COMPUTE_FIELDS } from '../constants';

// definition
export default (
  computeOrderList: (value: { [key: string]: string }) => void,
): ((changedValues: { [key: string]: string }) => void) => {
  const resetTimer = useResetTimer();

  return useCallback(
    changedValues => {
      const key = Object.keys(changedValues)[0];
      const value = changedValues[key];

      if (value && PRESERVED_FIELDS.includes(key)) {
        window.sessionStorage.setItem(
          key,
          key === 'addressAndZipCode' ? JSON.stringify(value) : value,
        );

        resetTimer();
      }

      if (COMPUTE_FIELDS.includes(key)) computeOrderList({ [key]: value });
    },
    [resetTimer, computeOrderList],
  );
};
