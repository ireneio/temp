// import
const path = require('path');

// definition
const getPkgPath = (name, ...paths) => {
  try {
    return path.resolve(require.resolve(name), '..', ...paths);
  } catch (e) {
    return '';
  }
};
const mapping = {
  'admin/common': getPkgPath('@meepshop/next-admin'),
  'store/common': getPkgPath('@meepshop/next-store'),

  // TODO: should remove
  'store/activity': getPkgPath('@meepshop/next-store', './locales/activity'),
  'store/cart': getPkgPath('@meepshop/next-store', './locales/cart'),
  'store/ducks': getPkgPath('@meepshop/next-store', './locales/ducks'),
  'store/login': getPkgPath('@meepshop/next-store', './locales/login'),
  'store/order-product-list': getPkgPath(
    '@meepshop/next-store',
    './locales/order-product-list',
  ),
  'store/order-show-total': getPkgPath(
    '@meepshop/next-store',
    './locales/order-show-total',
  ),
  'store/payment-default-form-item': getPkgPath(
    '@meepshop/next-store',
    './locales/payment-default-form-item',
  ),
  'store/product-list': getPkgPath(
    '@meepshop/next-store',
    './locales/product-list',
  ),
  'store/receiver-default-form-item': getPkgPath(
    '@meepshop/next-store',
    './locales/receiver-default-form-item',
  ),
  'store/spinner': getPkgPath('@meepshop/next-store', './locales/spinner'),
  'store/validate-mobile': getPkgPath(
    '@meepshop/next-store',
    './locales/validate-mobile',
  ),
};

module.exports = ({ folderPath, locale }) => {
  const pkgPath = mapping[folderPath] || getPkgPath(`@${folderPath}`);
  const [workspace, filename] = folderPath.split(/\//);
  const output = [];

  if (locale === 'zh_TW' && process.env.NODE_ENV !== 'production')
    output.push(path.resolve(pkgPath, './locale.json'));

  if (['meepshop', 'store'].includes(workspace))
    output.push(
      getPkgPath(
        '@meepshop/next-store',
        './src/public/locales',
        `${locale}/${filename}.json`,
      ),
    );

  if (['meepshop', 'admin'].includes(workspace))
    output.push(
      getPkgPath(
        '@meepshop/next-admin',
        './src/public/locales',
        `${locale}/${filename}.json`,
      ),
    );

  return output.filter(Boolean);
};
