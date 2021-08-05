// typescript import
import { RangePickerProps } from 'antd/lib/date-picker/generatePicker';

// import
import React, { useEffect, useState, useRef } from 'react';
import { areEqual } from 'fbjs';
import { startOfDay, endOfDay } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import DatePicker from '@meepshop/date-picker';

import changeValue from './utils/changeValue';
import styles from './styles/index.less';
import { DATE_TYPE } from './constants';

// typescript definition
export interface PropsType {
  value?: [Date, Date];
  onChange?: (value: PropsType['value']) => void;
}

// definition
const { RangePicker } = DatePicker;

export default React.memo(({ onChange, value: propsValue }: PropsType) => {
  const preValueRef = useRef<PropsType['value']>(propsValue);
  const { t } = useTranslation('date-picker');
  const [type, setType] = useState<typeof DATE_TYPE[number]>('today');
  const stateValue = useState<PropsType['value']>(propsValue);
  const [value, setValue] = !onChange ? stateValue : [propsValue, onChange];

  useEffect(() => {
    if (!areEqual(propsValue, preValueRef.current)) setValue(propsValue);
    preValueRef.current = propsValue;
  }, [propsValue, preValueRef, setValue]);

  return (
    <RangePicker
      className={styles.root}
      value={value as RangePickerProps<Date>['value']}
      separator="~"
      dropdownClassName={`${styles.dropdown} ${
        type === 'custom' ? '' : styles.notCustom
      }`}
      placeholder={[t('start-date'), t('end-date')]}
      onChange={newValue => {
        setValue(
          !newValue?.[0] || !newValue?.[1]
            ? undefined
            : [startOfDay(newValue[0]), endOfDay(newValue[1])],
        );
      }}
      renderExtraFooter={() =>
        DATE_TYPE.map((key: typeof DATE_TYPE[number]) => (
          <div
            key={key}
            className={`ant-select-item ${type !== key ? '' : styles.selected}`}
            onClick={() => {
              setType(key);
              if (key !== 'custom') setValue(changeValue(key));
            }}
          >
            {t(key as string)}
          </div>
        ))
      }
    />
  );
});
