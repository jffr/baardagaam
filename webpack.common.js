module.exports = {
  output: {
    filename: '[name].bundle.[fullhash].js',
    chunkFilename: '[name].chunk.[chunkhash].js',
  },
  devtool: 'source-map',
  stats: 'errors-warnings',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
