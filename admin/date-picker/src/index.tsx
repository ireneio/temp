// import
import React, { useEffect, useState, useRef } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import moment from 'moment';
import { areEqual } from 'fbjs';

import { useTranslation } from '@meepshop/locales';

import changeValue from './utils/changeValue';
import styles from './styles/index.less';
import { DATE_TYPE } from './constants';

// typescript definition
export interface PropsType {
  value?: [moment.Moment, moment.Moment];
  onChange?: (value: PropsType['value']) => void;
}

// definition
const { RangePicker } = AntdDatePicker;

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
      value={value}
      dropdownClassName={`${styles.dropdown} ${
        type === 'custom' ? '' : styles.notCustom
      }`}
      placeholder={[t('start-date'), t('end-date')]}
      onChange={newValue => {
        setValue(
          [newValue[0]?.startOf('day'), newValue[1]?.endOf('day')].filter(
            Boolean,
          ) as PropsType['value'],
        );
      }}
      renderExtraFooter={() =>
        DATE_TYPE.map((key: typeof DATE_TYPE[number]) => (
          <div
            key={key}
            className={`ant-select-dropdown-menu-item ${
              type !== key ? '' : 'ant-select-dropdown-menu-item-selected'
            }`}
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
