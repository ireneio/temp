// graphql typescript
import { CascaderOptionType } from 'antd/lib/cascader';

// import
import { useMemo } from 'react';

// definition
const findZipcodes = (
  options: CascaderOptionType[],
  address: string[] | undefined,
): string[] | null => {
  const [id, ...otherIds]: string[] = address || [];
  const option = options.find(({ value }) => value === id);
  const zipCodes = option?.zipCodes;

  if (zipCodes) return zipCodes;

  if (!option || otherIds.length === 0) return null;

  return findZipcodes(option.children || [], otherIds);
};

export default (
  options: CascaderOptionType[],
  address: string[] | undefined,
): ReturnType<typeof findZipcodes> =>
  useMemo(() => findZipcodes(options, address), [options, address]);
