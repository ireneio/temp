import { invariant } from 'fbjs';
import chalk from 'chalk';

import parseComment from './parseComment';

const findImport = componentString => ({
  childComponents: (
    componentString.match(/import [a-zA-Z]* from '\.\/(.*\/)*[a-zA-Z]*';/g) ||
    []
  )
    .map(text => text.replace(/import [a-zA-Z]* from '/, '').replace(/';/, ''))
    .filter(text => !/(utils)|(constants)|(styles)/.test(text)),
});

export default (componentName, componentPath, fileContent) => {
  const { displayName, props = {}, methods, description } = parseComment(
    componentName,
    fileContent,
  );

  /** check component name */
  invariant(
    displayName === componentName,
    chalk`
  Component name should be equal to folder name or file name.
  {cyan [Component Path] ${componentPath}}

  {green Received: ${displayName}}
  {red Expected: ${componentName}}
    `,
  );

  return {
    ...findImport(fileContent),
    displayName,
    props,
    methods,
    description,
  };
};
