const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    popup: './src/popup.ts',
    background: './src/background.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'popup.html', to: 'popup.html' },
        { from: 'icons', to: 'icons' },
        { from: 'src/bookmark.json', to: 'bookmark.json' },
        { from: 'optPageHello.html', to: 'optPageHello.html' },
      ],
    }),
    new WatchExternalFilesPlugin({
      files: [
        './manifest.json',
        './optPageHello.html',
        './popup.html'
      ]
    })
  ],
};
