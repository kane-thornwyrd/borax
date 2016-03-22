// ## UMD.js wrapper.
(function (root, factory) {
    // AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore','jquery','backbone','bluebird'], function (_, $, Backbone, bluebird) {
        return factory(_, $, Backbone);
    });
    // Commonjs.
  } else if(typeof exports !== 'undefined'){
    var
      _ = require('underscore'),
      $ = require('jquery'),
      Backbone = require('backbone'),
      bluebird = require('bluebird')
    ;

    exports = module.exports = factory(_, $, Backbone, bluebird);
    // Browser globals.
  } else {
    factory(_, $, Backbone, bluebird);
  }
}(this, function (_, $, Backbone, bluebird) {
'use strict';

  var defer = function defer() {
    var resolve, reject;
    var promise = new Promise(function() {
        resolve = arguments[0];
        reject  = arguments[1];
    });
    return {
      resolve : resolve,
      reject  : reject,
      promise : promise
    };
  };

  var _inst, _store = {}, Dispatcher = function Dispatcher() {};

  _.extend(Dispatcher.prototype, Backbone.Events, {

  on: function(name, callback, context){
  if(!_store[name]){
      _store[name] = defer();
    }
    Backbone.Events.on.apply(this, arguments);
    if(_store[name] === true){
      Backbone.Events.trigger.apply(this, [name]);
    }
  },

  trigger: function(name){
    if(!_store[name]){
      _store[name] = true;
    }
    Backbone.Events.trigger.apply(this, arguments);
  },


  once: function(name, callback, context){
    if(!_store[name]){
      _store[name] = defer();
    }
    Backbone.Events.once.apply(this, arguments);

    if(_store[name] === true){
      Backbone.Events.trigger.apply(this, [name]);
    }
  }



  });

  module.exports = Backbone.Dispatcher = _inst ? _inst : (_inst = new Dispatcher());

return Backbone.Dispatcher;

}));
