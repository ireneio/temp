// typescript import
import { Key } from 'path-to-regexp';

// import
import pathToRegexp from 'path-to-regexp';

// definition
const routes = [].map(({ pattern, page }) => {
  const keys: Key[] = [];
  const regexp = pathToRegexp(pattern, keys);

  return {
    regexp,
    keys,
    page,
  };
});

export default (
  href: string,
): {
  href: string;
  as?: string;
} => {
  const hrefPath: false | string = routes.reduce(
    (result, { regexp, keys, page }) => {
      if (result) return result;

      const isMatched = regexp.exec(href);

      if (!isMatched) return result;

      const values = isMatched.slice(1).map(val => decodeURIComponent(val));

      return keys.reduce(
        (prevHrefPath, key, index) =>
          `${prevHrefPath}${key.name}=${values[index]}`,
        `/${page}?`,
      );
    },
    false,
  );

  return !hrefPath
    ? {
        href,
      }
    : {
        href: hrefPath,
        as: href,
      };
};
