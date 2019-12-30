// import
import fs from 'fs';
import path from 'path';

// definition
export default (rootFolder: string, filename: string): string => {
  const pkgPath = path.resolve(rootFolder, './package.json');

  if (fs.existsSync(pkgPath)) {
    // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
    const { name } = require(pkgPath);

    if (name === '@admin/server')
      return `next-admin@${filename.replace(/\.json/, '')}`;

    return `next-store@${filename.replace(/\.json/, '')}`;
  }

  return `admin@${filename.replace(/\.json/, '')}`;
};
