const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const publish = process.env.IS_PUBLISH === '1';
const outputDir = publish ? '.' : 'dist';

module.exports = {
  entry: {
    'confirm': './packages/confirm/index.js',
    'alert': './packages/alert/index.js',
    'prompt': './packages/prompt/index.js',
  },
  output: {
    path: path.resolve(__dirname, outputDir),
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'packages/confirm/index.d.ts', to: 'confirm.d.ts' },
        { from: 'packages/alert/index.d.ts', to: 'alert.d.ts' },
        { from: 'packages/prompt/index.d.ts', to: 'prompt.d.ts' },
      ]
    })
  ],
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
      },
      {
        test:/\.svg$/,
        use: [
          'to-string-loader',
        ]
      }
    ]
  },
  optimization: {
    usedExports: true,
  },
};
