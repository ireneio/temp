// typescript import
import { FormItemProps } from 'antd';
import { PickerProps } from 'antd/lib/date-picker/generatePicker';

// import
import React, { useContext } from 'react';
import { Form } from 'antd';

import DatePicker, { AdminDatePicker } from './DatePicker';
import useValidator from './hooks/useValidator';
import SensorContext from '@meepshop/context/lib/Sensor';

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
    const { isMobile } = useContext(SensorContext);
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
          <DatePicker inputReadOnly={isMobile} {...datePickerProps} />
        </FormItem>
        {/* FIXME: remove when antd showToday props is added https://github.com/ant-design/ant-design/issues/28654 */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .ant-picker-footer{
                display: none
              }
            `,
          }}
        />
      </>
    );
  },
);
