// import
import fs from 'fs';
import path from 'path';

import outputFileSync from 'output-file-sync';

// definition
export default (name: string): void => {
  const packagePath = path.dirname(require.resolve(name));
  const [workspaceName, componentName] = name.replace(/@/, '').split(/\//);
  const hasReadme = fs.existsSync(path.resolve(packagePath, 'README.md'));

  outputFileSync(
    path.resolve(__dirname, '../../src/cache', `${name.replace(/@/, '')}.tsx`),
    `/* eslint-disable */
// import
import React from 'react';

import Provider from '@meepshop/mock-types/src/${workspaceName[0].toUpperCase()}${workspaceName.slice(
      1,
    )}Provider';
${(() => {
  if (fs.existsSync(path.resolve(packagePath, './mock.ts')))
    return `import Component from '${name}';
import props from '${name}/mock';

// definition`;

  if (
    fs.existsSync(path.resolve(packagePath, './mock.tsx')) ||
    fs.existsSync(path.resolve(packagePath, './mock/index.tsx'))
  )
    return `import Component from '${name}/mock';

// definition
const props = {}
`;

  return `import Component from '${name}';

// definition
const props = {}
`;
})()}
export const ${hasReadme ? 'demo' : componentName.replace(/-/g, '_')} = () => (
  /* @ts-ignore */
  <Provider>
    <Component {...props} />
  </Provider>
);

export default {
  title: '${hasReadme ? name : `@${workspaceName}`}',
};`,
  );
};
