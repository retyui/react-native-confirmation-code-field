module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended-legacy',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-compiler'],
  parserOptions: {
    ecmaVersion: 2025,
    sourceType: 'module',
    ecmaFeatures: {jsx: true},
  },
  settings: {
    react: {
      version: '18.0.0',
    },
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'react-compiler/react-compiler': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
  },
};
