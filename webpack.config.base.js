const path = require('path'),
      webpack = require('webpack');

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
    alias: {
      "dustjs": 'dustjs-linkedin',
      "dust.core": "dustjs-linkedin"
    }
  },
  module: {
    rules: [
      {
        test: /\.dust$/,
        exclude: /node_modules/,
        loader: "dust-loader-complete",
        options: {
          root: 'client/templates',
          verbose: true
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'global': 'window',
      'global.PLATFORM': '"browser"'
    })
  ]
};
