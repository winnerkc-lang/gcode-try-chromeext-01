const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const WatchExternalFilesPlugin = require('webpack-watch-files-plugin').default;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: {
      popup: './src/popup/popup.ts',
      background: './src/servicework/background.ts',
      optPageHello: './src/page/optPageHello.ts'
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
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'manifest.json', to: 'manifest.json' },
          { from: 'src/content/bookmark.json', to: 'bookmark.json' },
          { from: 'src/popup/popup.html', to: 'popup.html' },
          { from: 'src/page/optPageHello.html', to: 'optPageHello.html' },
          { from: 'node_modules/material-components-web/dist/material-components-web.min.css', to: 'material-components-web.min.css' },
          { from: 'node_modules/material-components-web/dist/material-components-web.min.js', to: 'material-components-web.min.js' },
        ],
      }),
      new WatchExternalFilesPlugin({
        files: [
          './manifest.json',
          './src/page/optPageHello.html',
          './src/popup/popup.html'
        ]
      })
    ],
  };
};
