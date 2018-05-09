const configBase = require('./webpack.config.base.js');

module.exports = Object.assign({}, configBase, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './public',
    compress: true
  }
});
