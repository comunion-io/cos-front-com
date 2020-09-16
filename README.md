# cos-front-com

## Project setup

yarn install

## Compiles and hot-reloads for development

yarn run serve

### Compiles and minifies for production

yarn run build

### Run your tests

yarn run test

### Lints and fixes files

yarn run lint

### Git 分支

1. master 是开发分支, 代码对应研发环境的现状
2. prod 是生产分支, 代码对应生产环境的现状

### 发布前须知

1. dev 发布前：

   - 请在 vue.config.js 中把域名地址改为 https://dev.comunion.io
   - 请在 web3.js 中， 把收款账号变为,
     - DEV_SETTING_RECEIVER（startup）
     - DEV_SETTING_RECEIVER (setting)
   - 注释掉生产收款账号

2. prod 发布前：
   - 请在 vue.config.js 中吧域名改为 http://dao.comunion.io
   - 请在 web3.js 中， 把收款账号变为：
     - PROD_STARTUP_RECEIVER （startup）
   - 注释掉开发账号地址
