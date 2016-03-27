const path = require('path');
const webpack = require('webpack');

const LOCAL_IDENT_NAME = '[name]_[local]_[hash:base64:5]';

module.exports = {

  entry: './src/client',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  module: {
    // preLoaders: [
    //   { test: /\.js$/, loader: 'baggage?[file].css=styles' }
    // ],
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          `css?modules&importLoaders=1&localIdentName=${LOCAL_IDENT_NAME}`
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  devtool: 'cheap-module-source-map',

  devServer: {

  },

  cssModules: {
    localIdentName: LOCAL_IDENT_NAME
  }

};
