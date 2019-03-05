module.exports = {
  '*.js': ['yarn prettier --write', 'yarn lint', 'git add'],
  '**/package.json': [
    'yarn prettier-package-json --write',
    'yarn prettier --parser json --write',
    'git add',
  ],
  '*.md': ['yarn prettier --parser markdown --write', 'git add'],
  '*.less': ['yarn prettier --parser less --write', 'git add'],
};
