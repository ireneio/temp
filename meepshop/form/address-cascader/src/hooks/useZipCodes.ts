// graphql typescript
import { CascaderOptionType } from 'antd/lib/cascader';

// import
import { useMemo } from 'react';

// definition
const findZipCodes = (
  options: CascaderOptionType[],
  address: string[] | undefined,
): string[] | null => {
  const [id, ...otherIds]: string[] = address || [];
  const option = options.find(({ value }) => value === id);
  const zipCodes = option?.zipCodes;

  if (zipCodes) return zipCodes;

  if (!option || otherIds.length === 0) return null;

  return findZipCodes(option.children || [], otherIds);
};

export default (
  options: CascaderOptionType[],
  address: string[] | undefined,
): ReturnType<typeof findZipCodes> =>
  useMemo(() => findZipCodes(options, address), [options, address]);
