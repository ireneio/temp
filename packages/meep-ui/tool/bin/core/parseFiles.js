import fs from 'fs';
import path from 'path';

import chalk from 'chalk';
import { warning } from 'fbjs';
import { upperFirst } from 'lodash';

import { root } from './cliOptions';
import needToParse from './needToParse';
import getFilesTree from './getFilesTree';
import getComponentData from './getComponentData';
import getPropTypesData from './getPropTypesData';

export default isTesting => {
  const componentsData = [];
  const originPropTypesData = [];

  getFilesTree().each(({ data: { type, path: filePath, name } }) => {
    if (type !== 'file') return;

    const fileContent = fs.readFileSync(filePath, 'utf8');

    if (name === 'propTypes.js') {
      const propTypesData = getPropTypesData(fileContent, isTesting);

      if (!propTypesData) return;

      originPropTypesData.push(getPropTypesData(fileContent, isTesting));
      return;
    }

    if (
      !needToParse(name, filePath) ||
      /(__story__)|(__tests__)/.test(filePath)
    )
      return;

    const componentName = upperFirst(
      name === 'index.js'
        ? filePath.split(/\//g).slice(-2)[0]
        : name.replace(/.js/, ''),
    );

    componentsData.push({
      componentPath: filePath
        .replace(path.resolve(root, './src'), '')
        .replace(/(.js)|(\/index)/g, ''),
      ...getComponentData(componentName, filePath, fileContent),
    });
  });

  const propTypesData = originPropTypesData.reduce((result, data) => {
    let hasWarning = false;

    Object.keys(data).forEach(key => {
      warning(!result[key], chalk`{red ${key}} exist.`);
      hasWarning = hasWarning || result[key];
    });

    if (hasWarning) console.log();

    return {
      ...result,
      ...data,
    };
  }, {});

  return { componentsData, propTypesData };
};
