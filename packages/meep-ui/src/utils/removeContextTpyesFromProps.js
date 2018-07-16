import { CONTEXT_TYPES } from 'constants/propTypes';

/**
 * Use to remove some props which are from contextTpye.
 * @param {Object} prevProps - props from component
 * @param {Array} extendRemove - the name of prop which is needed to be removed
 */
export default (prevProps, extendRemove = []) => {
  const newProps = { ...prevProps };

  [...Object.keys(CONTEXT_TYPES), ...extendRemove].forEach(typeName => {
    if (newProps[typeName] !== undefined) delete newProps[typeName];
  });

  return newProps;
};
