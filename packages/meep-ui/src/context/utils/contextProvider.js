import memoizeOne from 'memoize-one';
import { areEqual } from 'fbjs';

import { STORE_SETTING_TYPE_OBJ } from '../propTypes';
import enhancer from './enhancer';

export const contextPropsKey = {
  locale: ['locale', 'transformLocale'],
  location: ['location'],
  func: ['goTo'],
  storeSetting: Object.keys(STORE_SETTING_TYPE_OBJ),
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
