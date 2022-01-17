// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useMemo, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';

// graphql typescript
import { useUpsellingInitialValuesFragment as useUpsellingInitialValuesFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface ValuesType
  extends Omit<
    useUpsellingInitialValuesFragmentType,
    '__typename' | 'id' | 'startTime' | 'endTime'
  > {
  dates: readonly [Date | null, Date | null];
}

// definition
export default (
  { resetFields }: FormInstance,
  upsellingSetting: useUpsellingInitialValuesFragmentType | null,
): ValuesType | undefined => {
  const initialValues = useMemo(() => {
    if (!upsellingSetting) return undefined;

    const {
      title,
      isActive,
      startTime,
      endTime,
      hasUnlimitedDuration,
      hasLimitPerOrder,
      limitPerOrder,
      products,
    } = upsellingSetting;

    return {
      title,
      isActive,
      hasUnlimitedDuration,
      hasLimitPerOrder,
      limitPerOrder,
      products,
      dates: [
        startTime ? new Date(startTime) : null,
        endTime ? new Date(endTime) : null,
      ] as const,
    };
  }, [upsellingSetting]);
  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
