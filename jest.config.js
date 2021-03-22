module.exports = {
  setupFiles: ['./jest.setup', 'jest-canvas-mock'],
  moduleNameMapper: {
    '^.+\\.png$': '<rootDir>/__mocks__/image.ts',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  testMatch: [
    '**/babel/__tests__/*.ts',
    '**/meepshop/**/src/**/__tests__/**/*.{ts,tsx}',
    '**/store/**/src/**/__tests__/**/*.{ts,tsx}',
    '**/admin/**/src/**/__tests__/**/*.{ts,tsx}',
  ],
  testPathIgnorePatterns: ['__tests__/__ignore__'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/lib/', '/.next/'],
  collectCoverageFrom: [
    '**/meepshop/**/src/**/*.{ts,tsx}',
    '**/store/**/src/**/*.{ts,tsx}',
    '**/admin/**/src/**/*.{ts,tsx}',
  ],
  coverageReporters: ['html', 'text'],
};
