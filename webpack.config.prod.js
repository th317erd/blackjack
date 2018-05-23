const configBase = require('./webpack.config.base.js');

module.exports = Object.assign({}, configBase, {
  mode: 'production'
});
