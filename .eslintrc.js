module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'no-console': 'off',
    'no-debugger': 'off',
    'no-undef': 'off',
    'vue/no-v-html': 'off',
    semi: [2, 'never'],
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': [2, { semi: false, singleQuote: true, printWidth: 120, trailingComma: 'all' }],
    'vue/require-default-prop': 'off',
    quotes: [2, 'single'],
    'max-len': [2, 120],
  },
}
