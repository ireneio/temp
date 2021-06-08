// import
import { useEffect } from 'react';
import moment from 'moment';

// graphql typescript
import { getEcpayListVariables } from '@meepshop/types/gqls/admin';

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
  localStorage.removeItem('ecpayOrders-variables');

export const initVariables = (() => {
  // TODO: remove after orderlist move to next-admin
  if (typeof window !== 'undefined') {
    const variables = JSON.parse(
      localStorage.getItem('ecpayOrders-variables') || '{}',
    );

    if (Object.keys(variables).length !== 0) return variables;
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
