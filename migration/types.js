// TODO: should remove
const fs = require('fs');
const path = require('path');

require('core-js/modules/es.string.match-all');
const prettier = require('prettier');
const outputFileSync = require('output-file-sync');
// eslint-disable-next-line import/no-extraneous-dependencies
const execa = require('execa');

const config = require('../.prettierrc');

const getWorkspace = filePath => {
  const workspace = ['store', 'admin', 'meepshop', 'packages'].find(name =>
    filePath.includes(path.resolve(name)),
  );

  if (!workspace) throw new Error(`Could not find workspace: ${filePath}`);

  return workspace === 'packages' ? 'meepshop' : workspace;
};

process.argv.slice(2).forEach(async filePath => {
  const absoluteFilePath = path.resolve(filePath);
  const workspace = getWorkspace(absoluteFilePath);
  const content = fs
    .readFileSync(absoluteFilePath, 'utf-8')
    .replace(/\/\/ graphql typescript(.|\n)+\/\//, str => {
      const [gqls] = str.split(/\/\//).filter(Boolean);
      const types = gqls
        .replace(/ graphql typescript/, '')
        .replace(/import {[ ]?/g, '')
        .replace(/[ ]?} from .*/g, '')
        .split(/[,|\n]/)
        .filter(Boolean)
        .map(s => s.replace(/^[ ]+/gm, ''));

      return str.replace(
        `//${gqls}`,
        `// graphql typescript
import { ${types.join(',')}} from '@meepshop/types/gqls/${workspace}';

`,
      );
    });

  if (
    [...content.matchAll(/@meepshop\/types\/gqls/g)].length !== 1 ||
    /__generated__/.test(content)
  )
    throw new Error(`Migration fail: ${filePath}, ${content}`);

  try {
    outputFileSync(
      absoluteFilePath,
      prettier.format(content, {
        ...config,
        parser: 'typescript',
      }),
    );
    await execa('git', ['add', absoluteFilePath]);
  } catch (e) {
    throw new Error(`Parser error: ${filePath}, ${content}`);
  }
});
