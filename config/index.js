'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 这里就是配置连接后台数据的接口基本
    proxyTable: {
      // 反向代理中不能为空
      // target: 'http://192.168.85.73:8761/',
      // target: 'http://192.168.85.74:19097/',  
      // http://47.99.208.154:8812/xbg/user/getPhoneCode   
      '/xbg': {
        target: 'http://47.99.208.154:8812',
       // target: 'http://192.168.85.74:19097/',
       // target: 'http://192.168.31.221:8083/',
       // target: 'http://192.168.31.234:8083/',
       // secure: true,  // 如果是https接口，需要配置这个参数
       changeOrigin: true,
       pathRewrite: {
         // '^/base': ''   //重写接口
         //这里的配置是正则表达式，以/api开头的将会被用用‘/api’替换掉，假如后台文档的接口是 /api/list/xxx
         //前端api接口写：axios.get('/api/list/xxx') ， 被处理之后实际访问的是：http://news.baidu.com/api/list/xxx
       }      
     }
     
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
