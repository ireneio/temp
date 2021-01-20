// import
import fs from 'fs';
import path from 'path';

import dirTree from 'directory-tree';
import { hierarchy } from 'd3-hierarchy';

// definition
const IS_BUILD = process.env.NODE_ENV !== 'test' && process.env.CI;

const getPackageFolder = (packageName: string): string =>
  path.dirname(require.resolve(`@${packageName}`));

const mkdir = (folder: string): void => {
  if (!fs.existsSync(path.dirname(folder))) mkdir(path.dirname(folder));

  fs.mkdirSync(folder);
};

const linkFile = (targetPath: string, linkedPath: string): void => {
  if (!fs.existsSync(path.dirname(linkedPath))) mkdir(path.dirname(linkedPath));

  if (IS_BUILD) fs.copyFileSync(targetPath, linkedPath);
  else fs.symlinkSync(targetPath, linkedPath);
};

const mappingPackageNames: {
  [key: string]: string;
} = {
  'admin/common': getPackageFolder('admin/server'),
  'store/common': getPackageFolder('meepshop/store'),

  // TODO: should remove
  'admin/orders': path.resolve(
    getPackageFolder('admin/server'),
    './locales/orders',
  ),
  'store/activity': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/activity',
  ),
  'store/cart': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/cart',
  ),
  'store/ducks': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/ducks',
  ),
  'store/landing-page': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/landing-page',
  ),
  'store/login': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/login',
  ),
  'store/menu': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/menu',
  ),
  'store/order-product-list': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/order-product-list',
  ),
  'store/order-show-total': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/order-show-total',
  ),
  'store/payment-default-form-item': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/payment-default-form-item',
  ),
  'store/product-info': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/product-info',
  ),
  'store/product-list': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/product-list',
  ),
  'store/product-qa': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/product-qa',
  ),
  'store/receiver-default-form-item': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/receiver-default-form-item',
  ),
  'store/spinner': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/spinner',
  ),
  'store/validate-mobile': path.resolve(
    getPackageFolder('meepshop/store'),
    './locales/validate-mobile',
  ),
};

const linkLocaleFile = (
  repoPath: string,
  callback: (targetPath: string, linkedPath: string) => void = linkFile,
  filePath: string,
  name: string,
  extension: string | undefined,
): void => {
  const packageName = path.relative(repoPath, filePath).replace(`/${name}`, '');
  const packageFolder =
    mappingPackageNames[packageName] || getPackageFolder(packageName);
  const locale = name.replace(extension || '', '');
  const [workspace, filename] = packageName.split(/\//);

  if (locale === 'zh_TW' && !IS_BUILD)
    callback(filePath, path.resolve(packageFolder, './locale.json'));

  switch (workspace) {
    case 'meepshop':
      callback(
        filePath,
        path.resolve(
          getPackageFolder('meepshop/store'),
          './src/public/locales',
          locale,
          `${filename}.json`,
        ),
      );
      callback(
        filePath,
        path.resolve(
          getPackageFolder('admin/server'),
          './src/public/locales',
          locale,
          `${filename}.json`,
        ),
      );
      break;

    case 'store':
      callback(
        filePath,
        path.resolve(
          getPackageFolder('meepshop/store'),
          './src/public/locales',
          locale,
          `${filename}.json`,
        ),
      );
      break;

    case 'admin':
      callback(
        filePath,
        path.resolve(
          getPackageFolder('admin/server'),
          './src/public/locales',
          locale,
          `${filename}.json`,
        ),
      );
      break;

    default:
      throw new Error(`Can not find workspace: ${workspace}`);
  }
};

export default (
  repoPath: string,
  callback?: (targetPath: string, linkedPath: string) => void,
): void => {
  hierarchy(
    dirTree(repoPath, {
      extensions: /\.json$/,
    }),
  )
    .leaves()
    .forEach(({ data: { path: filePath, name, extension } }) => {
      linkLocaleFile(repoPath, callback, filePath, name, extension);
    });
};
