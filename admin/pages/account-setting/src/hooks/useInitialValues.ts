// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useMemo, useRef, useEffect } from 'react';
import { areEqual } from 'fbjs';

// graphql typescript
import { useInitialValuesUserFragment as useInitialValuesUserFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export interface ValuesType {
  name: string | null;
  additionalInfo: {
    mobile: string | null;
    tel: string | null;
  };
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
      additionalInfo: {
        mobile: viewer.additionalInfo?.mobile || '',
        tel: viewer.additionalInfo?.tel || '',
      },
    };
  }, [viewer]);

  const prevInitialValuesRef = useRef(initialValues);

  useEffect(() => {
    if (!areEqual(prevInitialValuesRef.current, initialValues)) {
      resetFields();
      prevInitialValuesRef.current = initialValues;
    }
  }, [resetFields, initialValues]);

  return initialValues;
};
