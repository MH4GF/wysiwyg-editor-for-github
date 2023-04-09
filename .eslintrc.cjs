/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  extends: ['@mh4gf'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['vite.config.ts', 'packages/rich-text-editor/src/__debug__/richtext.tsx'],
  rules: {
    'import/no-unresolved': 'off',
  },
}
