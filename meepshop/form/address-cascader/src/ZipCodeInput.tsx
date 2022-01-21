// import
import React, { useEffect, useContext } from 'react';
import { Input, Select } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/zipCodeInput.less';

// typescript definition
interface PropsType {
  size?: 'small' | 'middle' | 'large';
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  options: null | string[];
}

// definition
const { Option } = Select;

export default React.memo(
  ({
    size,
    placeholder,
    value,
    onChange,
    onBlur,
    options,
  }: PropsType): React.ReactElement => {
    const colors = useContext(ColorsContext);

    useEffect(() => {
      if (options && options.length === 1 && !value) onChange(options[0]);
    }, [value, onChange, options]);

    if (!options)
      return (
        <Input
          size={size}
          placeholder={placeholder}
          value={value}
          onChange={({ target: { value: newValue } }) => onChange(newValue)}
          onBlur={({ target: { value: newValue } }) => onBlur(newValue)}
        />
      );

    if (options.length === 1)
      return (
        <Input
          className={styles.disabled}
          style={{
            background: colors[3]
              ? transformColor(colors[3])
                  .alpha(0.03)
                  .toString()
              : '#F5F5F5',
            color: colors[3] || 'rgba(0,0,0,0.65)',
          }}
          size={size}
          placeholder={placeholder}
          value={options[0]}
          disabled
        />
      );

    return (
      <Select
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={({
          target: { value: newValue },
        }: React.FocusEvent<HTMLSelectElement>) => onBlur(newValue)}
      >
        {options.map(valueValue => (
          <Option key={valueValue} value={valueValue}>
            {valueValue}
          </Option>
        ))}
      </Select>
    );
  },
);
