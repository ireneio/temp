module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  globals: {
    FB: true,
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {},
      'babel-module': {},
    },
  },
  rules: {
    'max-len': 'off',
    'no-console': 'off',
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'fixme'],
        location: 'anywhere',
      },
    ],

    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
  },
};
