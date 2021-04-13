module.exports = {
  '*.js': ['yarn lint:prettier', 'prettier --write'],
  '*.{ts,tsx}': ['yarn lint:prettier', 'prettier --parser typescript --write'],
  '**/package.json': [
    'prettier-package-json --write',
    'prettier --parser json --write',
  ],
  '*.md': ['prettier --parser markdown --write'],
  '*.less': ['prettier --parser less --write'],
  '*.graphql': ['prettier --parser graphql --write'],
  '**/locales/locales/**/*.json': [
    'meep-cli locales prettier',
    'meep-cli locales translate',
  ],
  '*.yml': ['prettier --parser yaml --write', 'meep-cli update circleci'],
};
