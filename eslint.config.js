/* global require, __dirname, module */
const js = require('@eslint/js');
const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  {
    ignores: ['node_modules/', '.expo/', 'dist/', 'web-build/', 'easy-git.js'],
  },

  ...compat.extends('expo'),

  {
    rules: {
      'no-console': 'warn',
    },
  },
];
