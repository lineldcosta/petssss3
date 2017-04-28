'use strict';

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = function (env) {
  const webpackConfig = {
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
    },
    externals: [nodeExternals()],
    entry: [
      './server/server.js',
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      library: '[name]',
      libraryTarget: 'commonjs2',
      filename: 'server.js',
    },
    resolve: {
      alias: {
      },
      modules: [
        'node_modules',
        'assets',
      ],
      extensions: [
        '.js',
        '.css',
        '.json',
        '.jsx',
      ],
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: [
            'isomorphic-style-loader',
            'css-loader?importLoaders=2&sourceMap',
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        },
        { test  : /\.(woff|woff2|svg|ttf|eot)([\?]?.*)$/, loader: 'file-loader?name=[name].[ext]'},
        { test  : /\.(png|gif|jpe?g)$/i, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.json$/, loader: 'json-loader'},
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        isBrowser: JSON.stringify(false),
        'process.env.SERVERLESS': env ? env.serverless : false,
      }),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new CopyWebpackPlugin([
        //{ from: 'server/lambda.js', to: 'lambda.js' },
        //{ from: 'server/node_modules', to: 'node_modules' },
      ]),
    ],
    devtool: 'eval-source-map',
      stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
      }
  };

  return webpackConfig;
};