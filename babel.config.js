const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

const plugins = [];
if (IS_PROD) {
  plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }]);
}

// lazy load ant-design-vue
// if your use import on Demand, Use this code
plugins.push([
  'import',
  {
    libraryName: 'ant-design-vue',
    libraryDirectory: 'es',
    // `style: true` 会加载 less 文件
    style: true
  }
]);

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
