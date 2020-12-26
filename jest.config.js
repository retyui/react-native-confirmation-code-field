const {resolve} = require('path');
const {name: displayName} = require('./package');

module.exports = {
  displayName,
  testEnvironment: 'node',
  preset: 'react-native',
  cacheDirectory: resolve(__dirname, './node_modules/.jestcache'),
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testRegex: '\\.test\\.(js|ts)x?$',
  coverageThreshold: {
    global: {branches: 100, functions: 100, statements: 100},
  },
};
