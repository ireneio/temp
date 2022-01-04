// import
import { useEffect, useRef } from 'react';
import { getElementPosition } from 'fbjs';

// graphql typescript
import { refactorOrderHistoryRecordsFragment as refactorOrderHistoryRecordsFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface OrderHistoryType {
  records?: refactorOrderHistoryRecordsFragmentType[];
  height: number;
}

// definition
const config = { attributes: true, childList: true, subtree: true };

export default (
  setProps: (value: OrderHistoryType) => void,
  records?: refactorOrderHistoryRecordsFragmentType[],
): React.RefObject<HTMLDivElement> => {
  const orderHistoryRecordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observeCallback = (): void => {
      if (orderHistoryRecordsRef.current && records) {
        const { height } = getElementPosition(orderHistoryRecordsRef.current);

        setProps({
          records,
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
  }, [records, setProps]);

  return orderHistoryRecordsRef;
};
