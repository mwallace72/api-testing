module.exports = {
  env: {
    'jest/globals': true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:jest/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['simple-import-sort', 'jest', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    semi: 'off',
    quotes: ['error', 'single'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'quote-props': ['error', 'as-needed'],
  },
}
