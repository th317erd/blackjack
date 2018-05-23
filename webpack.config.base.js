const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'javascript'),
    publicPath: '/javascript'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'client/templates'),
      'node_modules'
    ],
    extensions: [
      '.js',
      '.dust'
    ],
    alias: { dustjs: 'dustjs-linkedin' }
  },
  module: {
    rules: [
      {
        test: /\.dust$/,
        exclude: /node_modules/,
        loader: path.resolve( __dirname, 'index' ),
        options: {
          root: 'client/templates',
          verbose: true
        }
      }
    ]
  }
};
