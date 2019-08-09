'use strict';

module.exports = {
  extends: ['@exeto/eslint-config/node', 'prettier'],
  plugins: ['prettier', 'flowtype'],
  rules: { 'prettier/prettier': 'error' },
  overrides: [
    { files: ['**/*.test.js', '**/__tests__/*.js'], env: { jest: true } },
  ],
  settings: { react: { version: '16.9', flowVersion: '0.98' } },
};
