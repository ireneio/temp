module.exports = {
  '*.js': ['yarn prettier --write', 'yarn lint', 'git add'],
  '*.{ts,tsx}': [
    'yarn prettier --parser typescript --write',
    'yarn lint',
    'git add',
  ],
  '**/package.json': [
    'yarn prettier-package-json --write',
    'yarn prettier --parser json --write',
    'git add',
  ],
  '*.md': ['yarn prettier --parser markdown --write', 'git add'],
  '*.less': ['yarn prettier --parser less --write', 'git add'],
  '*.graphql': ['yarn prettier --parser graphql --write', 'git add'],
  '**/locales/locales/**/*.json': ['yarn locales auto-translate', 'git add'],
};
