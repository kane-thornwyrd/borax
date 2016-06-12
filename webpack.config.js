'use strict';

var webpack = require('webpack');
var env = process.env.NODE_ENV;

var immutableExternal = {
  root: 'Immutable',
  commonjs2: 'immutable',
  commonjs: 'immutable',
  amd: 'immutable'
};

var config = {
  externals: {
    'immutable': immutableExternal
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  entry: {
    app: './src/borax.js'
  },
  output: {
    library: 'Borax',
    libraryTarget: 'umd'
  },
  plugins: [
    {
      apply: function apply(compiler) {
        compiler.parser.plugin('expression global', function expressionGlobalPlugin() {
          this.state.module.addVariable('global', "(function() { return this; }()) || Function('return this')()");
          return false;
        });
      }
    },
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
