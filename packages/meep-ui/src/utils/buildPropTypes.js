import PropTypes from 'prop-types';
import isInt from 'validator/lib/isInt';

const buildPropTypes = (type, validator, valueType = 'string') => {
  const checkPropType = isRequired => (prevProps, propName, componentName) => {
    const value = prevProps[propName]?.toString();

    if (
      value &&
      (!validator(value, prevProps, propName, componentName) ||
        // eslint-disable-next-line  valid-typeof
        typeof prevProps[propName] !== valueType)
    ) {
      return new Error(
        `Invalid prop \`${propName}\` of type \`${type}\` supplied to \`${componentName}\`, expected \`${type}\``,
      );
    }

    if (!value && isRequired) {
      return new Error(
        `The prop \`${propName}\` is marked as required in \`${componentName}\`, but its value is \`${value}\`.`,
      );
    }

    return null;
  };
  const outputFunc = checkPropType();

  outputFunc.isRequired = checkPropType(true);

  return outputFunc;
};

export const buildD3TreeTypes = (dataName, nodeType, dataType) => {
  const checkD3TreeType = (isRequired, depth = 0) => (
    props = {},
    propName,
    componentName,
  ) => {
    const { children, data } = props;
    const propTypes = {
      id: PropTypes.string,
      height: buildPropTypes('positive integer', value =>
        isInt(value, { min: 0 }),
      ),
      depth: PropTypes.oneOf([depth]),
      data: PropTypes.shape({
        key: PropTypes.string.isRequired,
        /** root does not have parent */
        ...(depth === 0 ? null : { parent: PropTypes.string.isRequired }),
        /** type of node expect leaf */
        ...(depth === 0 || !children ? null : nodeType),
        /** type of leaf node */
        ...(depth === 0 || children
          ? null
          : {
              [dataName]: PropTypes.checkPropTypes(
                dataType,
                (data || {})[dataName],
                `${propName}.data.${dataName}`,
                componentName,
              ),
            }),
      }),
      /** root does not have parent */
      ...(depth === 0
        ? null
        : {
            parent: PropTypes.shape({ id: PropTypes.string.isRequired }),
          }),
    };
    const defaultPropTypes = !children
      ? {}
      : {
          children: PropTypes.arrayOf((propValue, key) =>
            checkD3TreeType(isRequired, depth + 1)(
              propValue[key],
              `${propName}.children[${key}]`,
              componentName,
            ),
          ).isRequired,
        };

    return PropTypes.checkPropTypes(
      Object.keys(propTypes).reduce(
        (result, key) => ({
          ...result,
          [key]:
            depth > 0 || isRequired
              ? propTypes[key].isRequired
              : propTypes[key],
        }),
        defaultPropTypes,
      ),
      props,
      propName,
      componentName,
    );
  };
  const checkPropTypeFunc = isRequired => (
    prevProps = {},
    propName,
    componentName,
  ) =>
    checkD3TreeType(isRequired)(prevProps[propName], propName, componentName);
  const outputFunc = checkPropTypeFunc();

  outputFunc.isRequired = checkPropTypeFunc(true);

  return outputFunc;
};

export default buildPropTypes;
