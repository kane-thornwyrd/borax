// ## UMD.js wrapper.
(function (root, factory) {
    // AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore','jquery','backbone'], function (_, $, Backbone) {
        return factory(_, $, Backbone);
    });
    // Commonjs.
  } else if(typeof exports !== 'undefined'){
    var
      _ = require('underscore'),
      $ = require('jquery'),
      Backbone = require('backbone')
    ;

    exports = module.exports = factory(_, $, Backbone);
    // Browser globals.
  } else {
    factory();
  }
}(this, function (_, $, Backbone) {
'use strict';

var _inst;

var Dispatcher = function Dispatcher(){};

_.extend(Dispatcher.prototype, Backbone.Events, {});

Backbone.Dispatcher = _inst ? _inst : _inst = new Dispatcher();

}));
