// import
import React, { useEffect } from 'react';
import { Input, Select } from 'antd';
import transformColor from 'color';

import styles from './styles/zipCodeInput.less';

// graphql typescript
import { getCountriesAddress_getColorList as getCountriesAddressGetColorList } from './__generated__/getCountriesAddress';

// typescript definition
interface PropsType {
  size?: 'small' | 'default' | 'large';
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  options: null | string[];
  colors: getCountriesAddressGetColorList['colors'];
}

// definition
const { Option } = Select;

const ZipCodeInput = ({
  size,
  placeholder,
  value,
  onChange,
  options,
  colors,
}: PropsType): React.ReactElement => {
  if (!options)
    return (
      <Input
        size={size}
        placeholder={placeholder}
        value={value}
        onChange={({ target: { value: newValue } }) => onChange(newValue)}
      />
    );

  if (options.length === 1) {
    useEffect(() => {
      if (!value) onChange(options[0]);
    }, [value]);

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
  }

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
};

export default React.memo(ZipCodeInput);
