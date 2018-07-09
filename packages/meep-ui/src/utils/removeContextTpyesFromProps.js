import { CONTEXT_TYPES } from 'constants/propTypes';

/**
 * Use to remove some props which are from contextTpye.
 * @param {Object} preProps - props from component
 * @param {Array} extendRemove - the name of prop which is needed to be removed
 */
export default (preProps, extendRemove = []) => {
  const props = { ...preProps };

  [...Object.keys(CONTEXT_TYPES), ...extendRemove].forEach(typeName => {
    if (props[typeName] !== undefined) delete props[typeName];
  });

  return props;
};
