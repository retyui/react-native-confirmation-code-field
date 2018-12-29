'use strict';

module.exports = {
  preset: 'react-native',
  setupTestFrameworkScriptFile: '<rootDir>.setup-tests.js',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      statements: 100,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.setup-tests.js',
    '(.*)/styles.js',
    '<rootDir>/src/components/ConfirmationCodeInput/validation.js',
  ],
  modulePathIgnorePatterns: ['/examples/'],
  testPathIgnorePatterns: ['/node_modules/', '/examples/'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
};
