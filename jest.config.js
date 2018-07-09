// TODO

// eslint-disable-next-line import/no-unresolved
const getFilesTree = require('./lib/__tool__/bin/core/getFilesTree').default;

module.exports = {
  setupFiles: ['./jest.setup'],
  testPathIgnorePatterns: getFilesTree()
    .children.filter(
      ({ data }) => !['utils', 'context', 'constants'].includes(data.name),
    )
    .map(({ data }) => `src/${data.name}/__tests__/[a-zA-Z0-9]*.js`),
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/__story__/*.js',
    '!**/__tests__/*.js',
  ],
  coverageReporters: ['html', 'text'],
};
