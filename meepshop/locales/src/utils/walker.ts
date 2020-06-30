// typescript import
import { LOCALES } from '../constants';

// import
import path from 'path';

import dirTree from 'directory-tree';
import { hierarchy } from 'd3-hierarchy';

// type definition
export interface DataType {
  [key: string]: DataType | string | null;
}

type callbackType = (data: {
  folderPath: string;
  filePath: string;
  locale: keyof typeof LOCALES;
  keys: string[];
  value: string | null;
}) => void;

// definition
const walk = (
  data: DataType,
  keys: string[],
  output: Omit<Parameters<callbackType>[0], 'keys' | 'value'>,
  callback: callbackType,
): void => {
  Object.keys(data).forEach(key => {
    const value = data[key];
    const newKeys = [...keys, key];

    if (value instanceof Object) walk(value, newKeys, output, callback);
    else
      callback({
        ...output,
        keys: newKeys,
        value,
      });
  });
};

export default (repoPath: string, callback: callbackType): void => {
  hierarchy(
    dirTree(repoPath, {
      extensions: /\.json$/,
    }),
  )
    .leaves()
    .forEach(({ data: { path: filePath, name, extension } }) => {
      walk(
        // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
        require(filePath),
        [],
        {
          folderPath: path.dirname(filePath),
          filePath,
          locale: name.replace(extension || '', '') as keyof typeof LOCALES,
        },
        callback,
      );
    });
};
