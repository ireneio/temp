// typescript import
import { FormInstance } from 'antd/lib/form';

// import
import { useCallback } from 'react';

// typescript definition
interface ChangedFieldsType {
  name: string[];
  value: string;
}

// definition
export default ({
  setFieldsValue,
}: FormInstance): ((changedFields: ChangedFieldsType[]) => void) => {
  return useCallback(
    changedFields => {
      if (
        changedFields[0]?.name?.[0] === 'exportFormatId' &&
        changedFields[0]?.value === 'TCAT_ORDER'
      ) {
        setFieldsValue({
          fileType: 'csv',
        });
      }
    },
    [setFieldsValue],
  );
};
