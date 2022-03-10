// typescript import
import { FormInstance } from 'antd/lib/form';

import { initializeValuesType } from '@admin/utils/lib/types';

// import
import { useMemo, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';
import omit from 'lodash.omit';

// graphql typescript
import { useProgramInitialValuesFragment as useProgramInitialValuesFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface ValuesType
  extends Omit<useProgramInitialValuesFragmentType, '__typename' | 'id'> {
  productsType: 'specify' | 'all';
}

type initialValuesType = initializeValuesType<ValuesType, 'productsType'>;

// definition
export default (
  { resetFields }: FormInstance,
  affiliateProgram: useProgramInitialValuesFragmentType | null,
): initialValuesType | Pick<initialValuesType, 'productsType'> => {
  const initialValues = useMemo(
    () => ({
      ...omit(affiliateProgram, ['__typename', 'id']),
      productsType:
        (affiliateProgram?.products || []).length !== 0
          ? ('specify' as const)
          : ('all' as const),
    }),
    [affiliateProgram],
  );
  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
