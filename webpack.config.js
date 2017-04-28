const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
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
    //loaders: [,
    //, new ExtractTextPlugin('style.css', { allChunks: true })
  //]
  },
  resolve: {
    modules: ['node_modules', 
                path.resolve(__dirname, 'assets')
              ],
    extensions: [ '.js', '.jsx', '.css', '.json']
  },
  devServer: {
    historyApiFallback: true,
    port: process.env.PORT || 3000,
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      isBrowser: JSON.stringify(true),
    }),
    new webpack.ProvidePlugin({
        $     : 'jquery', // expose $ and jquery globally
        jQuery: 'jquery',
        'window.jQuery' : 'jquery'
    }),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
      //children: true,
      //name: "commons",
      //filename: "commons.js",
      async: true,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
//    new webpack.DefinePlugin({ 'process.env.NODE_ENV': "development" })
    //new BundleAnalyzerPlugin()
  ],
  watch: true
};
