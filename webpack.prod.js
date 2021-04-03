const { merge } = require('webpack-merge');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  entry: './src/scripts/main.ts',
  plugins: [new BundleStatsWebpackPlugin()],
});
