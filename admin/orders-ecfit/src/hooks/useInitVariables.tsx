// typescript import
import { getEcfitListQueryPropsType } from '../constants';

// import
import { useEffect } from 'react';
import moment from 'moment';

// definition
// TODO: remove after print move to next-admin
if (
  typeof window !== 'undefined' &&
  moment().diff(
    moment(localStorage.getItem('selectedOrders-timeout') || undefined),
    'minutes',
    true,
  ) > 1
)
  localStorage.removeItem('ecfitOrders-variables');

export const initVariables = (() => {
  // TODO: remove after orderlist move to next-admin
  if (typeof window !== 'undefined') {
    const variables = JSON.parse(
      localStorage.getItem('ecfitOrders-variables') || '{}',
    );

    if (Object.keys(variables).length !== 0) return variables;
  }

  return {
    first: 10,
    filter: {
      ecfitSentStatus: 'NOT_SENT',
    },
  };
})();

export default (variables: getEcfitListQueryPropsType['variables']): void => {
  useEffect(() => {
    // TODO: remove after print move to next-admin
    if (typeof window !== 'undefined')
      localStorage.setItem('ecfitOrders-variables', JSON.stringify(variables));
  }, [variables]);
};
