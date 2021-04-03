const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/scripts/main.ts',
  ],
  mode: 'development',
  plugins: [
    new HotModuleReplacementPlugin()
  ]
});
