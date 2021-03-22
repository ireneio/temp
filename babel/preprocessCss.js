const path = require('path');

const handleCssRelativePath = (css, filePath) => {
  if (process.env.NODE_ENV !== 'test') return css;

  return css.replace(/@import ['"](.*)['"];/g, (match, p1) => {
    try {
      require.resolve(p1.replace(/~/g, ''));

      return match;
    } catch (e) {
      return match.replace(p1, path.resolve(path.dirname(filePath), p1));
    }
  });
};

module.exports = (css, filePath) => {
  const newCss = handleCssRelativePath(css, filePath);

  if (/ignore meepshop id/.test(newCss)) return newCss;

  if (/@import/.test(newCss))
    return `${newCss.replace(/(@import.*;\n?)+/, '$&:global(#meepshop) {')}}`;

  return `:global(#meepshop) { ${newCss} }`;
};
