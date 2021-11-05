// import
import { useEffect } from 'react';
import { differenceInSeconds } from 'date-fns';
import { isEmpty } from 'fbjs';

// graphql typescript
import { getEcpayListVariables } from '@meepshop/types/gqls/admin';

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
  localStorage.removeItem('ecpayOrders-variables');

export const initVariables = (() => {
  // TODO: remove after orderlist move to next-admin
  if (typeof window !== 'undefined') {
    const variables = JSON.parse(
      localStorage.getItem('ecpayOrders-variables') || '{}',
    );

    if (!isEmpty(variables)) return variables;
  }

  return {
    first: 10,
    filter: {
      logisticTrackingStatus: ['PROCESSING', 'MANUAL_PROCESSING', 'PLACING'],
    },
  };
})();

export default (variables: getEcpayListVariables): void => {
  useEffect(() => {
    // TODO: remove after print move to next-admin
    if (typeof window !== 'undefined')
      localStorage.setItem('ecpayOrders-variables', JSON.stringify(variables));
  }, [variables]);
};
