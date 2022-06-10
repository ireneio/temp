// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useMemo, useEffect } from 'react';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';

// graphql typescript
import { useInitialValuesUserFragment as useInitialValuesUserFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface ValuesType {
  name: string | null;
  mobile: string | null;
  tel: string | null;
}

// definition
export default (
  { resetFields }: FormInstance,
  viewer: useInitialValuesUserFragmentType | null,
): ValuesType | undefined => {
  const initialValues = useMemo(() => {
    if (!viewer) return undefined;

    return {
      name: viewer.name,
      mobile: viewer.mobile,
      tel: viewer.tel,
    };
  }, [viewer]);

  const prevInitialValues = usePrevious(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValues, initialValues)) resetFields();
  }, [resetFields, initialValues, prevInitialValues]);

  return initialValues;
};
