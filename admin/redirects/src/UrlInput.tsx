// typescript import
import { InputProps } from 'antd/lib/input';

// import
import React from 'react';
import { Input } from 'antd';

import formatUrl from './utils/formatUrl';

// definition
export default React.memo(({ onChange, onBlur, ...props }: InputProps) => (
  <Input
    {...props}
    onChange={onChange}
    onBlur={e => {
      e.target.value = formatUrl(e.target.value);

      if (onChange) onChange(e);
      if (onBlur) onBlur(e);
    }}
  />
));
