module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
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
    'import/internal-regex': '@meepshop/(types|mock-types)',
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.tsx'],
      },
      'babel-module': {
        root: ['./src'],
        cwd: 'packagejson',
      },
    },
  },
  rules: {
    'no-console': 'error',
    'no-warning-comments': [
      'warn',
      {
        terms: ['todo', 'fixme', 'SHOULD_NOT_BE_NULL'],
        location: 'anywhere',
      },
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__typename'],
      },
    ],

    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'react/no-unused-prop-types': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'static-variables',
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

    'import/no-extraneous-dependencies': [
      'error',
      // FIXME: https://github.com/benmosher/eslint-plugin-import/pull/1696
      { packageDir: ['.', 'packagejson'] },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin'],
      /**
       * TODO: remove, use `plugin:@typescript-eslint/recommended`
       * extends: [
       *   'plugin:@typescript-eslint/recommended',
       *   'plugin:prettier/recommended',
       *   'prettier/@typescript-eslint',
       * ]
       */
      rules: {
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/ban-ts-ignore': 'error',
        '@typescript-eslint/ban-types': 'error',
        camelcase: 'off',
        '@typescript-eslint/camelcase': 'error',
        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          { allowExpressions: true },
        ], // modify
        '@typescript-eslint/interface-name-prefix': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        'no-array-constructor': 'off',
        '@typescript-eslint/no-array-constructor': 'error',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-explicit-any': 'error', // modify
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'error',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-this-alias': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ], // modify
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'off', // prettier
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',

        // other
        'import/no-duplicates': 'off', // modify
        'import/order': 'off', // modify
      },
    },
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
  ],
};
