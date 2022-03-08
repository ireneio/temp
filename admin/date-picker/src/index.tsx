// typescript import
import { RangePickerDateProps } from 'antd/lib/date-picker/generatePicker';

import { DateType } from './constants';

// import
import React, { useState } from 'react';
import locale from 'antd/lib/date-picker/locale/en_US';
import { startOfDay, endOfDay } from 'date-fns';
import { emptyFunction } from 'fbjs';

import { useTranslation } from '@meepshop/locales';
import DatePicker from '@meepshop/date-picker';

import changeValue from './utils/changeValue';
import styles from './styles/index.less';
import { DATE_TYPE } from './constants';

// typescript definition
export interface PropsType extends RangePickerDateProps<Date> {
  disableTemplates?: boolean;
  onChange?: (value: PropsType['value']) => void;
}

// definition
const { RangePicker } = DatePicker;

export default React.memo(
  ({
    className,
    showTime,
    disableTemplates,
    onChange = emptyFunction,
    ...props
  }: PropsType) => {
    const { t } = useTranslation('date-picker');
    const [type, setType] = useState<DateType>(
      disableTemplates ? 'custom' : 'today',
    );

    return (
      <RangePicker
        {...props}
        className={`${styles.root} ${className || ''}`}
        separator="~"
        dropdownClassName={`${styles.dropdown} ${
          disableTemplates ? '' : styles.templates
        } ${type === 'custom' ? '' : styles.notCustom}`}
        placeholder={[t('start-date'), t('end-date')]}
        showTime={showTime}
        onChange={newValue => {
          if (!showTime)
            return onChange(
              newValue && [
                newValue[0] ? startOfDay(newValue[0]) : null,
                newValue[1] ? endOfDay(newValue[1]) : null,
              ],
            );

          return onChange(newValue);
        }}
        renderExtraFooter={
          disableTemplates
            ? undefined
            : () =>
                DATE_TYPE.map(key => (
                  <div
                    key={key}
                    className={`ant-select-item ${
                      type !== key ? '' : styles.selected
                    }`}
                    onClick={() => {
                      setType(key);
                      if (key !== 'custom') onChange(changeValue(key));
                    }}
                  >
                    {t(key as string)}
                  </div>
                ))
        }
        locale={{
          ...locale,
          lang: {
            ...locale.lang,
            ok: t('ok'),
          },
        }}
      />
    );
  },
);
