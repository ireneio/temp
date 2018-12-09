import memoizeOne from 'memoize-one';
import { areEqual } from 'fbjs';

import enhancer from './enhancer';

export const contextPropsKey = {
  locale: ['locale', 'transformLocale'],
  location: ['location'],
  func: ['goTo'],
  storeSetting: ['storeSetting'],
};

export default (originTypes, useRef = false) => {
  const types = originTypes instanceof Array ? originTypes : [originTypes];

  return {
    removeContextProps: memoizeOne(prevProps => {
      const newProps = { ...prevProps };

      types.forEach(type =>
        contextPropsKey[type].forEach(typeName => {
          if (newProps[typeName] !== undefined) delete newProps[typeName];
        }),
      );

      return newProps;
    }, areEqual),
    enhancer: enhancer(types, useRef),
  };
};
