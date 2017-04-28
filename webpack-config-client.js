const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
//const S3Plugin = require('webpack-s3-plugin');

const config = require('./scripts/config');

module.exports = function (env) {
  const webpackConfig = {
    entry:  [
    'babel-polyfill',
    './src/index.js'
  ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: config.cdn,
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
        '.jsx',
        '.json'
      ],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        { test  : /\.(woff|woff2|svg|ttf|eot)([\?]?.*)$/, loader: 'file-loader?name=[name].[ext]'},
        { test  : /\.(png|gif|jpe?g)$/i, loader: 'file-loader?name=[name].[ext]' },
        { test: /\.json$/, loader: 'json'},
       // { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015', 'stage-1']
          }
        }
      ],
    },
    plugins: [
      new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new webpack.DefinePlugin({
        isBrowser: JSON.stringify(false),
        __env: JSON.stringify(),
        'process.env': {
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new ExtractTextPlugin('main.css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        filename: 'main.js',
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new ManifestPlugin(),
    ],
    devtool: 'source-map',
    stats: {
      children: false,
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  };
  /*
  if (!env.noDeploy) {
    webpackConfig.plugins.push(new S3Plugin({
      directory: 'build',
      s3Options: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
        region: env.region,
      },
      s3UploadOptions: {
        Bucket: env.bucket,
      },
      cacheOptions: {
        cacheControl: 'max-age=315360000, no-transform, public',
      },
    }));
  }*/

  return webpackConfig;
};