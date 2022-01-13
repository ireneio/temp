// import
import { useEffect, useRef } from 'react';
import { getElementPosition } from 'fbjs';

// graphql typescript
import { refactorOrderHistoryRecordsFragment as refactorOrderHistoryRecordsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface OrderHistoryType {
  auditLogs?: refactorOrderHistoryRecordsFragmentType[];
  height: number;
}

// definition
const config = { attributes: true, childList: true, subtree: true };

export default (
  setProps: (value: OrderHistoryType) => void,
  auditLogs?: refactorOrderHistoryRecordsFragmentType[],
): React.RefObject<HTMLDivElement> => {
  const orderHistoryRecordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observeCallback = (): void => {
      if (orderHistoryRecordsRef.current && auditLogs) {
        const { height } = getElementPosition(orderHistoryRecordsRef.current);

        setProps({
          auditLogs,
          height,
        });
      }
    };

    const obs = new MutationObserver(observeCallback);

    if (orderHistoryRecordsRef.current) {
      observeCallback();
      obs.observe(orderHistoryRecordsRef.current, config);
    }

    return () => {
      obs.disconnect();
    };
  }, [auditLogs, setProps]);

  return orderHistoryRecordsRef;
};
