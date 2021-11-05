// import
import { useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { isEmpty } from 'fbjs';

// graphql typescript
import { getEcfitListVariables } from '@meepshop/types/gqls/admin';

// definition
// TODO: remove after print move to next-admin
const selectedOrdersTimeout =
  typeof window !== 'undefined' &&
  localStorage.getItem('selectedOrders-timeout')
    ? localStorage.getItem('selectedOrders-timeout')
    : null;

if (
  selectedOrdersTimeout &&
  differenceInSeconds(new Date(), new Date(selectedOrdersTimeout)) > 60
)
  localStorage.removeItem('ecfitOrders-variables');

export const initVariables = (() => {
  // TODO: remove after orderlist move to next-admin
  if (typeof window !== 'undefined') {
    const variables = JSON.parse(
      localStorage.getItem('ecfitOrders-variables') || '{}',
    );

    if (!isEmpty(variables)) return variables;
  }

  return {
    first: 10,
    filter: {
      ecfitSentStatus: 'NOT_SENT',
    },
  };
})();

export default (variables: getEcfitListVariables): void => {
  useEffect(() => {
    // TODO: remove after print move to next-admin
    if (typeof window !== 'undefined')
      localStorage.setItem('ecfitOrders-variables', JSON.stringify(variables));
  }, [variables]);
};
