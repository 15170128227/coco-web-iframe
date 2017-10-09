'use strict'
const utils = require('./utils')
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

const pages = getEntry('src/module/**/*.html')

for (let pathname in pages) {
  // 配置生成的html文件，定义路径等
  let conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    inject: true, // js插入位置
    chunks: [pathname]
  }
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
function getEntry(globPath) {
  let entries = {}
  let basename

  glob.sync(globPath).forEach(function(entry) {
    basename = path.basename(entry, path.extname(entry))
    entries[basename] = entry
  })
  return entries
}
