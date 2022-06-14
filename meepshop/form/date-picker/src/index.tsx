// typescript import
import { FormItemProps } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';

// import
import React from 'react';
import { Form } from 'antd';

import DatePicker, { AdminDatePicker } from './DatePicker';
import useValidator from './hooks/useValidator';

// typescript definition
interface PropsType {
  enableValidator?: boolean;
  formItemProps: FormItemProps;
  datePickerProps: PickerProps<Date>;
}

// definition
const { Item: FormItem } = Form;

export { AdminDatePicker };

export default React.memo(
  ({ enableValidator = false, formItemProps, datePickerProps }: PropsType) => {
    const validator = useValidator();

    return (
      <>
        <FormItem
          {...formItemProps}
          rules={
            !enableValidator
              ? []
              : [
                  {
                    validator,
                  },
                ]
          }
        >
          <DatePicker inputReadOnly {...datePickerProps} />
        </FormItem>
      </>
    );
  },
);
