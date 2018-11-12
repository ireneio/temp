module.exports = {
  setupFiles: ['./jest.setup'],
  testMatch: [
    '**/!(meep-ui)/src/**/__tests__/**/*.js',
    '**/meep-ui/src/**/__tests__/.cache/*.js',
    '**/meep-ui/src/**/__tests__/!(.cache)/**/*.js',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/lib/', '/.next/'],
  collectCoverageFrom: [
    'packages/**/src/**/*.js',
    '!packages/meep-ui/src/**/__story__/*.js',
    '!packages/meep-ui/src/**/__tests__/*.js',
    '!packages/test-prod-server/**/*.js',
  ],
  coverageReporters: ['html', 'text'],
};
