const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: './src/client',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  devtool: 'inline-source-map',

  devServer: {

  }

};
