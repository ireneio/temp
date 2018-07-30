import parseDescription from './parseDescription';
import parseComment from './parseComment';

export const getValues = ({ type, description, required }, ...argu) => {
  const [handleCustomPropTypes, isTesting] =
    argu.length === 2 ? argu : [undefined, ...argu];

  const { name, raw, value, computed } = type;
  const { data: propData } = parseDescription(description, isTesting);
  const BUILD_ERROR_MESSAGE = [`build error: ${name}, ${JSON.stringify(type)}`];

  if (propData.length !== 0) return propData;

  switch (name) {
    case 'string':
      return isTesting ? ['test'] : ['test', '__test__', '123213'];
    case 'number':
      return isTesting
        ? [
            {
              isTesting: () => Math.random() * 2 - 1,
            },
          ]
        : [0, 1, -1, 1.1, -1.1];
    case 'bool':
      return [true, false];
    case 'arrayOf':
      return [
        {
          arrayOf: getValues({ type: value }, handleCustomPropTypes, isTesting),
        },
      ];
    case 'union':
      return value
        .map(unionType =>
          getValues({ type: unionType }, handleCustomPropTypes, isTesting),
        )
        .reduce((result, data) => {
          if (data instanceof Array)
            return [...result, ...data.filter(d => !result.includes(d))];

          if (result.includes(data)) return result;

          return [...result, data];
        }, []);
    case 'enum':
      if (computed) return BUILD_ERROR_MESSAGE;

      return (value instanceof Array ? value : [{ value }]).map(
        ({ value: data }) => data.replace(/'/g, ''),
      );
    case 'shape':
      if (!(value instanceof Object)) return [value];

      return [
        Object.keys(value).reduce(
          (newProps, propName) => ({
            ...newProps,
            [propName]: getValues(
              { type: value[propName] },
              handleCustomPropTypes,
              isTesting,
            ),
          }),
          {},
        ),
      ];
    default:
      if (name === 'custom' && /_TYPE/.test(raw) && handleCustomPropTypes)
        return handleCustomPropTypes(raw, required);
      return BUILD_ERROR_MESSAGE;
  }
};

export default (fileContent, isTesting) => {
  const propTypesString = fileContent
    .replace(/import (.|\n)* from .*;/g, '')
    .replace(/export const /g, '')
    .replace(/_TYPE = /g, '_TYPE: ')
    .replace(/\(props, propName, componentName\) => {(.|\n)*};/g, '() => {};')
    .replace(/.* = (([^;]*)|\n)*;/g, '')
    .replace(/;/g, ',');
  const { props } = parseComment(
    'Test',
    `
    Test.propTypes = {
      ${propTypesString}
    };
  `,
  );

  if (!props) return null;

  return Object.keys(props).reduce(
    (newProps, propName) => ({
      ...newProps,
      // eslint-disable-next-line react/destructuring-assignment
      [propName]: getValues(props[propName], isTesting),
    }),
    {},
  );
};
