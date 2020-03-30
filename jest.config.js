module.exports = {
  setupFiles: ['./jest.setup'],
  moduleNameMapper: {
    '^.+\\.png$': '<rootDir>/__mocks__/image.ts',
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'babel-jest',
  },
  testMatch: [
    '**/meepshop/**/src/**/__tests__/**/*.{ts,tsx}',
    '**/store/**/src/**/__tests__/**/*.{ts,tsx}',
    '**/admin/**/src/**/__tests__/**/*.{ts,tsx}',
    '**/packages/locale-parser/**/__tests__/**/*.{ts,tsx}',
  ],
  testPathIgnorePatterns: ['__tests__/__ignore__'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/lib/', '/.next/'],
  collectCoverageFrom: [
    '**/store/**/src/**/*.{ts,tsx}',
    '**/admin/**/src/**/*.{ts,tsx}',
    '!**/__generated__/**',
  ],
  coverageReporters: ['html', 'text'],
};
