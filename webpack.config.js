const path = require('path');

module.exports = {
  entry: {
    'confirm': './packages/confirm/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js', // the name will be the key in entry i.e. alert, confirm, prompt
    library: '[name]', // this will also be the key in the entry
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test:/\.s?css$/,
        use: [
          'to-string-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  optimization: {
    usedExports: true, // for tree shaking
  },
};
