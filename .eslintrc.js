module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/prettier', '@vue/typescript'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  globals: {
    ethereum: true,
    web3: true
  }
};
