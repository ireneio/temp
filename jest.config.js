const fs = require('fs');
const path = require('path');

module.exports = {
  setupFiles: ['./jest.setup'],
  testPathIgnorePatterns: fs
    .readdirSync(path.resolve(__dirname, './packages/meep-ui/src'))
    .filter(
      fileName =>
        !['utils', 'context', 'constants', 'locale'].includes(fileName),
    )
    .map(fileName => `src/${fileName}/__tests__/[a-zA-Z0-9]*.js`),
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/meep-ui/src/**/__story__/*.js',
    '!packages/meep-ui/src/**/__tests__/*.js',
    '!packages/test-prod-server/**/*.js',
  ],
  coverageReporters: ['html', 'text'],
};
