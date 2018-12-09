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
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
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
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-methods',
          'instance-variables',
          'lifecycle',
          '/^on.+$/',
          'getters',
          'setters',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'instance-methods',
          'everything-else',
          'rendering',
        ],
        groups: {
          lifecycle: [
            'displayName',
            'getInitialProps',
            'propTypes',
            'contextTypes',
            'childContextTypes',
            'mixins',
            'statics',
            'defaultProps',
            'constructor',
            'getDefaultProps',
            'state',
            'getInitialState',
            'getChildContext',
            'getDerivedStateFromProps',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
          rendering: ['/^render.+$/', 'render'],
        },
      },
    ],

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
  },
  overrides: [
    {
      files: ['packages/store/src/server/server.js'],
      rules: {
        'no-underscore-dangle': [
          'error',
          {
            allow: ['_headers', '_error'],
          },
        ],
      },
    },
    {
      files: ['packages/meep-ui/**'],
      rules: {
        'react/prop-types': [
          'error',
          {
            /** use to ignore context props, lib props */
            ignore: [
              /** context location props */
              'location',

              /** context func props */
              'goTo',

              /** context storeSetting props */
              'storeSetting',

              /** lib props */
              'form',
            ],
          },
        ],
      },
    },
  ],
};
