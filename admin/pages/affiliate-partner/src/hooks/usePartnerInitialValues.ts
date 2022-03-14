// typescript import
import { FormInstance } from 'antd/lib/form';

import { initializeValuesType } from '@admin/utils/lib/types';

// import
import { useMemo, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';
import omit from 'lodash.omit';

// graphql typescript
import { usePartnerInitialValuesFragment as usePartnerInitialValuesFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export type valuesType = Omit<
  usePartnerInitialValuesFragmentType,
  '__typename' | 'id'
>;

type initialValuesType = initializeValuesType<valuesType>;

// definition
export default (
  { resetFields }: FormInstance,
  affiliatePartner: usePartnerInitialValuesFragmentType | null,
): initialValuesType | undefined => {
  const initialValues = useMemo(
    () =>
      !affiliatePartner
        ? undefined
        : omit(affiliatePartner, ['__typename', 'id']),
    [affiliatePartner],
  );
  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
