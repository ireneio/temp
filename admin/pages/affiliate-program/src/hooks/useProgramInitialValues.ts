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
  extends Omit<
    useProgramInitialValuesFragmentType,
    '__typename' | 'id' | 'allProducts' | 'startAt' | 'endAt'
  > {
  endAtDisabled: boolean;
  productsType: 'specify' | 'all';
  startAt: Date;
  endAt: Date | null;
}

type initialValuesType = initializeValuesType<
  ValuesType,
  'endAtDisabled' | 'productsType'
>;

// definition
export default (
  { resetFields }: FormInstance,
  affiliateProgram: useProgramInitialValuesFragmentType | null,
): initialValuesType | Pick<initialValuesType, 'productsType'> => {
  const initialValues = useMemo(
    () => ({
      ...omit(affiliateProgram, [
        '__typename',
        'id',
        'allProducts',
        'startAt',
        'endAt',
      ]),
      endAtDisabled: !affiliateProgram?.endAt,
      productsType: affiliateProgram?.allProducts
        ? ('all' as const)
        : ('specify' as const),
      startAt: !affiliateProgram?.startAt
        ? null
        : new Date(affiliateProgram.startAt),
      endAt: !affiliateProgram?.endAt ? null : new Date(affiliateProgram.endAt),
    }),
    [affiliateProgram],
  );
  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
