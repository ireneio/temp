// import
import React, { useEffect, useContext } from 'react';
import { Input, Select } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import styles from './styles/zipCodeInput.less';

// typescript definition
interface PropsType {
  size?: 'small' | 'default' | 'large';
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
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
        />
      );

    if (options.length === 1)
      return (
        <Input
          className={styles.disabled}
          style={{
            background: transformColor(colors[5])
              .alpha(0.15)
              .toString(),
            color: colors[2],
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
      >
        {options.map(valueValue => (
          <Option key={valueValue}>{valueValue}</Option>
        ))}
      </Select>
    );
  },
);
