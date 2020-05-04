const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

const plugins = [];
if (IS_PROD) {
  plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }]);
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: 3
      }
    ]
  ],
  plugins
};
