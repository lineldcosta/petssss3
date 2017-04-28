const path = require('path');

const webpack = require('webpack');
const express = require('express');
const devMiddleware = require('webpack-dev-middleware');
//const hotMiddleware = require('webpack-hot-middleware');

const config = require('../webpack.config');
//console.log(config);
const app = express();
app.use('/assets', express.static('assets'));
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

//app.use(hotMiddleware(compiler));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

app.listen(config.devServer.port, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:'+config.devServer.port);
});
