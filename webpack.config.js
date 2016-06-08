var webpack    = require('webpack');
var webpackUMDExternal = require('webpack-umd-external');

module.exports = {
  entry: {
    app: './src/borax.js'
  },
  output: {
    path: 'lib',
    filename: 'borax.js'
  },
  externals: {
    'immutable': 'Immutable'
  },
  module: {
   loaders: [{
    test: /\.js$/,
    loader: 'babel',
    include: __dirname + '/src'
   }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
          except: [, 'exports', 'require']
        }
    })
  ]
 };
