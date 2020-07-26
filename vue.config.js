const webpack = require('webpack');
// const isProd = process.env.NODE_ENV === 'production';

// const assetsCDN = {
//   // webpack build externals
//   externals: {
//     vue: 'Vue',
//     'vue-router': 'VueRouter',
//     vuex: 'Vuex',
//     axios: 'axios',
//     NProgress: 'nprogress'
//   },
//   css: ['//cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css'],
//   // https://unpkg.com/browse/vue@2.6.10/
//   js: [
//     '//cdn.staticfile.org/vue/2.6.11/vue.min.js',
//     '//cdn.staticfile.org/vue-router/3.1.3/vue-router.min.js',
//     '//cdn.staticfile.org/vuex/3.1.2/vuex.min.js',
//     '//cdn.staticfile.org/axios/0.19.2/axios.min.js',
//     '//cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js'
//   ]
// }

module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: 'https://dev.comunion.io'
    // proxy: 'http://dao.comunion.io'
  },
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
    // if prod, add externals
    // externals: isProd ? assetsCDN.externals : {}
  },
  css: {
    loaderOptions: {
      // pass Less.js Options to less-loader
      less: {
        modifyVars: {
          'primary-color': '#6170FF'
        },
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        javascriptEnabled: true
      }
    }
  },
  // disable source map in production
  productionSourceMap: false,
  chainWebpack: config => {
    // let originalOptions
    // const svgRule = config.module.rule('svg')
    // svgRule.use('file-loader').tap(options => {
    //   originalOptions = options
    // })
    // svgRule.uses.clear()

    // svgRule
    //   .oneOf('svg-component')
    //   .resourceQuery(/\?component/)
    //   .use('vue-svg-loader')
    //   .loader('vue-svg-loader')
    //   .end()
    //   .end()
    //   .oneOf('normal')
    //   .use('file-loader')
    //   .loader('file-loader')
    //   .options(originalOptions)
    config.module
      .rule('svg')
      .use('file-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [
            {
              removeDoctype: true
            },
            {
              removeXMLProcInst: true
            },
            {
              removeComments: true
            },
            {
              removeTitle: false
            },
            {
              removeDesc: true
            },
            {
              removeXMLNS: true
            },
            {
              removeScriptElement: true
            }
          ]
        }
      });

    // config.module
    //   .rule('images')
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     esModule: false
    //   })

    // if prod is on
    // assets require on cdn
    // if (isProd) {
    //   config.plugin('html').tap(args => {
    //     args[0].cdn = assetsCDN;
    //     return args;
    //   });
    // }
  }
};
