// typescript import
import { ReturnType } from './useComputedCart';

// import
import { useCallback } from 'react';

// definition
export default ({
  variables,
  refetch,
}: Pick<ReturnType, 'refetch' | 'variables'>): ((changedValues: {
  [key: string]: string;
}) => void) =>
  useCallback(
    changedValues => {
      const { shipmentId } = changedValues;

      if (shipmentId && variables)
        refetch({
          input: {
            ...variables.input,
            shipmentId,
          },
        });
    },
    [refetch, variables],
  );
