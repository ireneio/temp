import * as reactDocs from 'react-docgen';

export default (componentName, componentString) => {
  const newComponentString = componentString
    .replace(/\?\.\[/g, '[')
    .replace(/\?\./g, '.')
    .replace(/<>/g, '<React.Fragment>')
    .replace(/<\/>/g, '</React.Fragment>')
    .replace(/export default React\.forwardRef(.|\n)*;/, '')
    .replace(/^class/m, 'export default class');

  if (/extends React/.test(newComponentString))
    return reactDocs.parse(newComponentString);

  const [propTypesString] = newComponentString.match(
    new RegExp(`${componentName}.propTypes = {\n([^;]*\n)*[ ]*};`),
  ) || [''];
  const [defaultPropsString] = newComponentString.match(
    new RegExp(`${componentName}.defaultProps = {\n([^;]*\n)*[ ]*};`),
  ) || [''];

  return reactDocs.parse(`
      import React from 'react';
      import PropTypes from 'prop-types';

      export default class ${componentName} extends React.Component {
        ${propTypesString.replace(`${componentName}.`, 'static ')}

        ${defaultPropsString.replace(`${componentName}.`, 'static ')}

        render() {
          return null;
        }
      }
    `);
};
