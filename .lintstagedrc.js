const path = require('path');

const outputFileSync = require('output-file-sync');

const { plugins } = require('./babel.config');

/** build file to check keywrod */
(() => {
  const checkKeywordPath = path.resolve(
    __dirname,
    './node_modules/.cache/check-keyword.sh',
  );
  const options = plugins.find(
    pluginName =>
      pluginName instanceof Array && pluginName[0] === 'transform-imports',
  )[1];
  const KEYWORDS = [
    'React.Fragment',
    "from 'antd/lib",
    ...Object.values(options).map(
      ({ transform }) => `from '${transform.replace(/\/\${member}/, "[^']")}`,
    ),
  ].join('\\|');

  outputFileSync(
    checkKeywordPath,
    `#!/bin/bash

findKeyword=\`grep -rin "${KEYWORDS}" --exclude="**/node_modules/**" --exclude=".lintstagedrc.js" --exclude="**/tool/bin/core/**" --include="*.js" $@\`
whiteSpace='      '
info="\nFind keywords:
$findKeyword

Example:
- React.Fragment -> <>...</>
- import module from 'antd/lib/module' -> import { module } from 'antd'
${Object.keys(options)
      .map(
        key =>
          `- import module from '${
            options[key].transform
          }module' -> import { module } from '${key}'`,
      )
      .join('\n')}"

if [[ ! -z "$findKeyword" ]]; then
  echo "$info"
  exit 1;
fi`,
  );
})();

module.exports = {
  '*.js': [
    'sh ./node_modules/.cache/check-keyword.sh',
    'yarn prettier --write',
    'yarn lint',
    'git add',
  ],
  '*.md': ['yarn prettier --parser markdown --write', 'git add'],
  '*.less': ['yarn prettier --parser less --write', 'git add'],
};
