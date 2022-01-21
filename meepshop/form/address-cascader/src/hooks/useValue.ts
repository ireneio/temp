// graphql typescript
import { CascaderOptionType } from 'antd/lib/cascader';

// import
import { useEffect } from 'react';

// definition
export default (
  options: CascaderOptionType,
  value?: {
    address?: string[];
    zipCode?: string;
  },
  onChange?: (value: { address?: string[]; zipCode?: string }) => void,
): {
  address: string[] | undefined;
  zipCode: string | undefined;
} => {
  const { address = undefined, zipCode = undefined } = value || {};

  useEffect(() => {
    if (
      onChange &&
      options.length === 1 &&
      (address || []).length === 0 &&
      !options[0].children
    )
      onChange({
        address: [options[0].value as string],
        zipCode,
      });
  }, [address, zipCode, onChange, options]);

  return {
    address: address?.filter(Boolean),
    zipCode,
  };
};
