'use strict';

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup-tests.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'jest.setup-tests.js',
    '(.*)/styles.js',
    '<rootDir>/src/components/ConfirmationCodeInput/validation.js',
  ],
  modulePathIgnorePatterns: ['/examples/'],
  testPathIgnorePatterns: ['/node_modules/', '/examples/'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
};
