'use strict';

module.exports = {
  parser: 'babel-eslint',
  extends: ['@exeto', '@exeto/react', 'prettier'],
  plugins: ['prettier', 'flowtype'],
  rules: {
    'react/jsx-no-bind': 'warn',
    'prettier/prettier': 'error',
    // https://github.com/gajus/eslint-plugin-flowtype/blob/master/.README/rules/define-flow-type.md
    'flowtype/define-flow-type': 'warn',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
