'use strict';

module.exports = {
  extends: ['@exeto/eslint-config/node', 'prettier'],
  plugins: ['prettier', 'flowtype'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/__tests__/*.js'],
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    react: {
      version: '16.8',
      flowVersion: '0.94',
    },
  },
};
